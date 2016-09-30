const express         = require('express');
const app             = express();
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');

import bunyan from 'bunyan';
import bformat from 'bunyan-format';
  
const formatOut = bformat({ outputMode: 'short' });
 
const log = bunyan.createLogger({ 
  name: 'app', 
  stream: formatOut, 
  level: 'debug' 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/hub');

app.use('/api', require('./app/routes/index'));
app.use('/api/defect', require('./app/routes/defect'));

app.listen(port, () => log.info(`Magic happens on port ${port}`));
