import cron from 'node-cron';
import bunyan from 'bunyan';
import bformat from 'bunyan-format';
  
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

cron.schedule('* * * * *', function() {
  log.info('Running a task every minute: ', new Date());

  // Do whatevers...
  // You will likely do the following kind of extract/transform/load (ETL):
  // * Read data from source
  // * Transform or manipulate the data for publishing to the hub
  // * Load the data into the hub via the API
});