import cron from 'node-cron';
import bunyan from 'bunyan';
import bformat from 'bunyan-format';
import request from 'request';
import fs from 'fs';
import { parseString } from 'xml2js';
import moment from 'moment';

let config = JSON.parse(fs.readFileSync('config.json'));
console.log(config);
  
const formatOut = bformat({ outputMode: 'short' });
 
const log = bunyan.createLogger({ 
  name: 'app', 
  stream: formatOut, 
  level: 'debug' 
});

log.info('Collector starting up...');
//log.debug('things are heating up', { temperature: 80, status: { started: 'yes', overheated: 'no' } });
//log.warn('getting a bit hot', { temperature: 120 });
//log.error('OOOOHHH it burns!', new Error('temperature: 200'));
//log.fatal('I died! Do you know what that means???');

function handleQcException(resp) {
  let opts = {
    mergeAttrs : true,
    trim: true,
    normalizeTags: true,
    normalize: true,
    explicitArray: false
  };
  parseString(resp.body, opts, function (err, result) {
    log.error(result.qcrestexception.id + '-' + result.qcrestexception.title);
  });
}

function logout() {
  let logoutUrl = urlBase + URL_LOGOUT;
  log.info('Disconnecting from Quality Center...');
  log.debug(logoutUrl);
  request(logoutUrl, (error, response, body) => {
    if(response.statusCode === 200) {
      log.info('...done.');
    }
  });
}

let fields = [
  { name: 'id', qcField: 'id', mapTo: true },
  { name: 'type', qcField: 'user-42', mapTo: false },
  { name: 'summary', qcField: 'name', mapTo: true },
  { name: 'description', qcField: 'description', mapTo: true },
  { name: 'severity', qcField: 'severity', mapTo: true },
  { name: 'priority', qcField: 'priority', mapTo: true },
  { name: 'state', qcField: 'user-23', mapTo: true }
/*
          'creation-time', // DetectionDate
          'detected-by', // DetectedBy

          'user-02', // AssignedTo

          'project', // Project
          'user-04', // Product
          'user-07', // SubSystem
          'user-76',    // Component

          'user-05', // FoundInVersion
          'user-06', // FoundInRelease
          'user-16', // TargetVersion
          'user-15', // TargetRelease
          
          'user-31', // Comments

          'user-36', // CodeCompleteDate
          'user-68', // ReadyForBuildDate
          'user-29', // ReadyForTestDate
          'user-22', // DevReqCloseDate
          'user-37', // DevReqInfoDate
          'user-64', // ClonedDate
          'user-24', // ClosedDate     
          'user-61', // PostponedDate     

          'last-modified', // Last Modified
          'user-89', // Tags*/
        ]

function mapDefect(entry) {
  var defect = {};
  for(var f of fields) {
    if (f.mapTo) {
      defect[f.name] = entry.fields.field.find(e => e.Name === f.qcField).value
    }
  }

  return defect;
}

const URL_BASE = `http://{0}:{1}/qcbin/`;
const URL_AUTH = "authentication-point/authenticate";
const URL_LOGOUT = "authentication-point/logout"

//cron.schedule('* * * * *', function() {
  log.info('Running a task every minute: ', new Date());

  let urlBase = URL_BASE.replace("{0}", config.host).replace("{1}", config.port);

  log.debug(urlBase + URL_AUTH);

  let opts = {
    url: urlBase + URL_AUTH,
    headers: {
      'Authorization': 'Basic '+new Buffer(config.almUser + ':' + config.almPwd).toString('base64')
    }
  }
  request(opts, (error, response, body) => {
    if(response.statusCode === 200) {
      if (response.headers['set-cookie']) {
        let cookie = response.headers['set-cookie'];
        log.debug('cookie', cookie);
        
        var filters = [];
        for(var prop in config.almFilter) {
          filters.push(prop + '['+ encodeURIComponent(config.almFilter[prop]) + ']');
        }
        
        let query = "{";
        query += filters.join(';');
        if (config.trailingUpdateMinutes != -1) {
          query += ";last-modified[> \"" + moment().add(-config.trailingUpdateMinutes,'m').format("YYYY-MM-DD hh:mm:ss") + "\"]";
        }
        query += "}";

        var queryOptions = {
          url: urlBase + "rest/domains/" + config.almDomain + "/projects/" + config.almProject + 
            "/defects?query=" + query + "&fields=" + fields.map(f => f.qcField).join(',') + "&page-size=max",
          headers: {
            "Cookie": cookie
          }
        }

        log.info('Querying Quality Center...');
        log.debug(queryOptions.url);
        request(queryOptions, (error, response, body) => {
          if(response.statusCode === 200) {
            // This is async so fix flow
            var parseOpts = {
              mergeAttrs : true,
              trim: true,
              normalizeTags: true,
              normalize: true,
              explicitArray: false
            };
            parseString(response.body, parseOpts, function (err, result) {
              // Build up the defect representation we want.
              var defects = [];
              for(var entry of result.entities.entity) {
                defects.push(mapDefect(entry));
              }

              fs.writeFile("dump.json", JSON.stringify(defects, undefined, 2), function(err) {
                if(err) {
                  log.error(err);
                }

                log.debug("The JSON file was saved!");
                log.info('...done.');
                logout();
              });
            });
            
          } else {
            handleQcException(response);
            logout();
          }
        });
      } else {
        log.error('Unable to login, check your username/password/serverURL.');
      }
    }
    
    //console.log(error);
    //console.log(body);
  });
//});