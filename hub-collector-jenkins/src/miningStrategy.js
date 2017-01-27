import fetch from 'node-fetch';
import _ from 'underscore';
import moment from 'moment';

module.exports = function(app) {
  var module = {};

  module.app = app;

  module.mine = function(uri, workflowId) {
    // This will min the stage definition first, then move on to runs.
    module.app.log.debug('mine(uri: ' + uri + ', workflowId: ' + workflowId + ')');

    module.fetchHubHeaders = { headers: { 'Content-Type': 'application/vnd.api+json', 'Authorization': module.app.token } };
    module.fetchJenkinsHeaders = { headers: { 'Content-Type': 'application/vnd.api+json', 'Accept': 'application/vnd.api+json' } };

    let stages = [];

    fetch(uri + 'wfapi/runs', Object.assign({ method: 'get' }, module.fetchJenkinsHeaders)).then(resp => resp.json())
    .then(json => {
     // module.app.log.debug(json);
      if(json.length > 0) {
        // just take the last run to identify stages.
        //let workflowRun = json[0];
        let workflowRun = _.max(json, (run) => run.stages.length);
        //module.app.log.debug(workflowRun.stages);
        for(let i = 0; i < workflowRun.stages.length; i++) {
          //module.app.log.debug(workflowRun.stages[i].name);
          let stageName = workflowRun.stages[i].name;
          let stageOrder = i;
          stages.push(new Promise((resolve, reject) => {
            //module.app.log.info('Processing async task: ' + stageName);
            fetch(module.app.config.hub.apiHost + '/api/workflowStep/?filter[name]=' + stageName + '&filter[workflowId]=' + workflowId,
              Object.assign(
                { method: 'get' },
                module.fetchHubHeaders
              )
            )
            .then(respLookup => respLookup.json())
            .then(respLookupJson => {
              //module.app.log.debug(respLookupJson);
              if (respLookupJson.data.length == 0) {
                // Create it
                var workflowStep = {
                  type: 'workflowStep',
                  attributes: {
                    workflowId: workflowId,
                    uri: 'n/a', /* No good URI here but the workflow one */
                    name: stageName,
                    description: stageName + ' description',
                    order: stageOrder
                  }
                }
                fetch(module.app.config.hub.apiHost + '/api/workflowStep/',
                Object.assign(
                  { method: 'post' },
                  module.fetchHubHeaders,
                  {
                    body: JSON.stringify({ data: workflowStep })
                  })
                )
                .then(respAdd => respAdd.json())
                .then(respAddJson => {
                  //module.app.log.info(respAddJson);
                  resolve();
                })
              } else {
                resolve();
              }
            }).catch(err => {
              module.app.log.error(err);
              reject(err);
            })
          }))
        }
        Promise.all(stages).then(() => {
          module.app.log.info('Done, waited like a good boy!');
          module.mineWorkflowRun(uri, workflowId);
        });
      }
    })
    .catch(err => {
      module.app.log.error(err)
    })
    /*
    for (var i = 0; i < 5; i++) {
      stages.push(new Promise((resolve, reject) => {
        module.app.log.info('Processing async task: ' + i);
        let index = i;
        setTimeout(() => {
          module.app.log.info('Processing async task complete: ' + index);
          resolve();
        }, i * 10000);
      }))
    }
    // shove in promise functions

    Promise.all(stages).then(() => {
      module.app.log.info('Done, waited like a good boy!');
    });
    */
  }

  module.mineWorkflowRun = function(uri, workflowId) {

    // Mine the stage definitions first.

    module.app.log.debug('mineWorkflowRun(' + uri + ', ' + workflowId + ')');
    // populate the workflow run info using /wfapi/runs and identify the steps from that as well.
    // module.app.log.debug(uri + 'wfapi/runs with token: ' + module.app.token);

    fetch(uri + 'wfapi/runs', Object.assign({ method: 'get' }, module.fetchJenkinsHeaders)).then(resp => resp.json())
    .then(json => {
      //module.app.log.info(json);
      // An array of the past runs (sample had 11, odd number.. not sure if that is the full history)
      for(var i = 0; i < json.length; i++) {
        let entry = json[i];
        let workflowRun = {
          type: 'workflowRun',
          attributes: {
            workflowId: workflowId,
            uri: module.app.config.jenkins.host + entry._links.self.href.replace('wfapi/describe', ''),
            status: entry.status,
            start: entry.startTimeMillis,
            duration: entry.durationMillis
          }
        }

        // Figure out if it exists already.
        fetch(module.app.config.hub.apiHost + '/api/workflowRun/?filter[uri]=' + workflowRun.attributes.uri,
          Object.assign(
            { method: 'get' },
            module.fetchHubHeaders
          )
        )
        .then(respLookup => respLookup.json())
        .then(respLookupJson => {
          //module.app.log.info(respLookupJson);

          if (respLookupJson.data.length == 0) {
            //module.app.log.info('Couldn\'t find item with id: ' + entry.id + ', create it');
            fetch(module.app.config.hub.apiHost + '/api/workflowRun/',
            Object.assign(
              { method: 'post' },
              module.fetchHubHeaders,
              {
                body: JSON.stringify({ data: workflowRun })
              })
            )
            .then(respAdd => respAdd.json())
            .then(respAddJson => {
              //module.app.log.info(respAddJson);
              module.mineStages(workflowId, respAddJson.data.id, entry);
            })
          } else {
            //module.app.log.info('Found item with id: ' + entry.id + ', update it');

            workflowRun.id = respLookupJson.data[0].id;
            //module.app.log.info(workflowRun);

            fetch(module.app.config.hub.apiHost + '/api/workflowRun/' + workflowRun.id,
            Object.assign(
              { method: 'patch' },
              module.fetchHubHeaders,
              {
                body: JSON.stringify({ data: workflowRun })
              })
            )
            .then(respAdd => respAdd.json())
            .then(respAddJson => {
              //module.app.log.info(respAddJson);
              module.mineStages(workflowId, workflowRun.id, entry);
            })

          }
        })
        .catch(err => {
          module.app.log.error(err)
        })
      }
    })
    .catch(err => {
      module.app.log.error(err);
    })
  }

  module.mineStages = function(workflowId, workflowRunId, entry) {
    //module.app.log.debug(entry);
    for(let i = 0; i < entry.stages.length; i++) {
      let stageEntry = entry.stages[i];

      let workflowStep = {
        type: 'workflowStep',
        attributes: {
          workflowId: workflowId,
          uri: 'n/a', /* No good URI here but the workflow one */
          name: stageEntry.name,
          description: stageEntry.name + ' description'
        }
      }
      let workflowStepName = stageEntry.name;
      //module.app.log.debug(stage);
      // does it exist by name? no, add it and get id. yes? get id.

      // Deal with the stage definitions first.
      //module.app.log.debug('"' + module.app.config.hub.apiHost + '/api/workflowStep/?filter[name]=' + encodeURI(workflowStepName) + '&filter[workflowId]=' + workflowId + '"');
      fetch(module.app.config.hub.apiHost + '/api/workflowStep/?filter[name]=' + encodeURI(workflowStepName) + '&filter[workflowId]=' + workflowId,
          Object.assign(
            { method: 'get' },
            module.fetchHubHeaders
          )
        )
        .then(respLookup => respLookup.json())
        .then(respLookupJson => {
          //module.app.log.debug(respLookupJson);
          if (respLookupJson.data.length == 0) {
            module.app.log.info('Couldn\'t find workflow step with name: ' + workflowStepName + '! These should all have been present by now.');
          } else {
            module.app.log.info('Found workflow step with name: ' + workflowStepName);

            let stageRun = {
              type: 'workflowStepRun',
              attributes: {
                workflowStepId: respLookupJson.data[0].id,
                workflowRunId: workflowRunId,
                status: stageEntry.status,
                start: stageEntry.startTimeMillis,
                duration: stageEntry.durationMillis
              }
            }
            //module.app.log.debug(stageRun);

            // Sat, 12 Aug 1995 13:30:00 GMT
            let startDateFormattedForKatharsisStupidity = moment(stageRun.attributes.start).format("ddd, D MMM YYYY HH:mm:ss z");

            module.app.log.debug(module.app.config.hub.apiHost + '/api/workflowStepRun/?filter[workflowStepId]=' + stageRun.attributes.workflowStepId + '&filter[start]=' + startDateFormattedForKatharsisStupidity);
            fetch(module.app.config.hub.apiHost + '/api/workflowStepRun/?filter[workflowStepId]=' + stageRun.attributes.workflowStepId + '&filter[start]=' + startDateFormattedForKatharsisStupidity,
              Object.assign(
                { method: 'get' },
                module.fetchHubHeaders
              )
            )
            .then(respStepRunLookup => respStepRunLookup.json())
            .then(respStepRunLookupJson => {
              //module.app.log.debug(respStepRunLookupJson);

              if (respStepRunLookupJson.data.length == 0) {
                fetch(module.app.config.hub.apiHost + '/api/workflowStepRun/',
                  Object.assign(
                    { method: 'post' },
                    module.fetchHubHeaders,
                    {
                      body: JSON.stringify({ data: stageRun })
                    }
                  )
                )
                .then(respAdd => respAdd.json())
                .then(respAddJson => {
                  module.app.log.info('Successfully added step run');
                  //module.app.log.info(respAddJson);
                })
              }
            })
            .catch(err => {
              module.app.log.error(err)
            })
          }
        })
        .catch(err => {
          module.app.log.error(err)
        })
    }
  }

  module.mineChangeSets = function(entry) {
    module.app.log.debug('mine changesets (not implemented)');
    /*
      Basically will mine a format response like the following
      [
        {
          "kind": "git",
          "commitCount": 1,
          "commits": [
            {
              "commitId": "792e8827dcff06850cfadb2e3bb05a6791a930d4",
              "authorJenkinsId": "Quang.Truong",
              "message": "Select Connected host only",
              "timestamp": 1483573013000,
              "consoleUrl": "/job/FTW/job/WFM/job/WFM-Workflow/145/changes#792e8827dcff06850cfadb2e3bb05a6791a930d4"
            }
          ],
          "consoleUrl": "/job/FTW/job/WFM/job/WFM-Workflow/145/changes"
        }
      ]
    */
  }

  return module;
};