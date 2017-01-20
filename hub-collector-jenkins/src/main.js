import cron from 'node-cron';
import bunyan from 'bunyan';
import bformat from 'bunyan-format';
import config from '../config';
import fetch from 'node-fetch';
import fs from 'fs';
import moment from 'moment';

const formatOut = bformat({ outputMode: 'short' });

const log = bunyan.createLogger({
  name: 'app',
  streams: [
    {
      stream: formatOut,
      level: 'debug'
    },
    {
      path: './log/hub-collector-jenkins.log',
      level: 'debug'
    }
  ]
});

let app = {
  token: null,
  log: log,
  config: config
}

const MiningUtil = require('./miningStrategy')(app);

log.info('Collector starting up...');
//log.debug('things are heating up', { temperature: 80, status: { started: 'yes', overheated: 'no' } });
//log.warn('getting a bit hot', { temperature: 120 });
//log.error('OOOOHHH it burns!', new Error('temperature: 200'));
//log.fatal('I died! Do you know what that means???');

//cron.schedule('* * * * *', function() {
  log.info('Running a task every minute: ', new Date());

  // if dynamic
  if (config.uris.dynamic) {
    /*
    fetch('http://lchase:c0e4276e51310eb2d50018e34a196f6a@atljenkinsstaging.lab.local:8080/api/json?pretty', {
      method: 'get',
      headers: {
        accept: 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      //log.info(json);
      fs.writeFile('./log/' + moment().format('YYYY-MM-DD_HH-mm-ss') + '-dump.json', JSON.stringify(json, null, 2), function (err) {
        if (err) return log.error(err);
      });

      for(var i=0; i<json.jobs.length; i++) {
        log.info(json.jobs[i]);
        fetch(json.jobs[i].url+'?json/api?pretty', {
          method: 'get',
          headers: {
            accept: 'application/json'
          }
        })
      }
    }).catch(err => {
      log.error(err);
    });*/
  } else {
    if (config.uris.explicit && config.uris.explicit.length > 0) {
      for(var i = 0; i < config.uris.explicit.length; i++) {
        var rawUri = config.uris.explicit[i].uri;
        fetch(config.uris.explicit[i].uri + 'wfapi', {
          method: 'get',
          headers: {
            accept: 'application/json'
          }
        })
        .then(res => res.json())
        .then(json => {
          fs.writeFile('./log/' + moment().format('YYYY-MM-DD_HH-mm-ss') + '-dump-wfapi.json',
            JSON.stringify(json, null, 2), function (err) {
            if (err) return log.error(err);
          });

          // Find the entry in the hub and create it if it doesn't exist.
          var workflowName = json.name;
          var workflowUri = json._links.self.href;

          fetch(config.hub.apiHost + '/auth/login', {
            method: 'post',
            headers: {
              'Content-Type': 'application/vnd.api+json',
              'Accept': 'application/vnd.api+json'
            },
            body: JSON.stringify({
              email: config.hub.credentials.username,
              password: config.hub.credentials.password
            })
          })
          .then(res => {
            //log.debug(res);
            return res.json();
          })
          .then(authJson => {
            var token = authJson.token; // authenticated token for future requests.
            app.token = token;
            var configGetWithToken = {
              method: 'get', 
              headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': token
              }
            };
            var configPatchWithToken = {
              method: 'patch', 
              headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': token
              }
            };
            var configPostWithToken = {
              method: 'post', 
              headers: {
                'Content-Type': 'application/vnd.api+json',
                'Authorization': token
              }
            };

            fetch(config.hub.apiHost + '/api/workflow/?filter[name]=' + workflowName, configGetWithToken).then(res => res.json())
            .then(workflowJson => {
              var workflowId = null;

              var payload = {
                data: {
                  type: 'workflow',
                  attributes: {
                    name: workflowName,
                    description: workflowName + ' description',
                    uri: app.config.jenkins.host + workflowUri.replace('wfapi/describe', '')
                  }
                }
              };

              if (workflowJson.data.length > 0) {
                workflowId = workflowJson.data[0].id;
                payload.data.id = workflowId;
                log.info('update workflow: ' + workflowName);
                fetch(config.hub.apiHost + '/api/workflow/' + workflowId, {
                  method: 'patch',
                  headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': token
                  },
                  body: JSON.stringify(payload)
                })
                .then(res => res.json())
                .then(json => {
                  //log.info(json);
                  MiningUtil.mine(rawUri, workflowId);
                })
              } else {
                log.info('create workflow: ' + workflowName);
                fetch(config.hub.apiHost + '/api/workflow', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': token
                  },
                  body: JSON.stringify(payload)
                })
                .then(res => res.json())
                .then(json => {
                  workflowId = json.data.id;
                  MiningUtil.mine(rawUri, workflowId);
                })
              }
            })
            .catch(err => {
              log.error(err);
            });
          })
          .catch(err => {
            log.error(err);
          });
        })
        .catch(err => {
          log.error(err);
        });
      }
    } else {
      log.error('The configuration did not specify dynamic discovery, explicit uris are required under uris.explicit');
    }
  }
  // Do whatevers...
  // You will likely do the following kind of extract/transform/load (ETL):
  // * Read data from source
  // * Transform or manipulate the data for publishing to the hub
  // * Load the data into the hub via the API
//});