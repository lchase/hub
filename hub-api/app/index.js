const express     = require('express');
const app         = express();
const logger      = require('morgan');
const config      = require('./config/index');
const bodyParser  = require('body-parser');

const router = require('./router');

/* sequelize test */
const models = require('./models');

models.User.sync().then(function() {
/*
  models.User.findOrCreate({ where: { email: 'admin@verint.com' }, defaults: { firstName: 'admin', lastName: 'admin', password: 'blue' } })
  .spread(function(user, created) {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
  })

  models.User.update({ password: 'c' }, { where: { email: 'admin@verint.com' }})
*/
/*
  models.User.findOne({ where: { email: 'admin@verint.com'} }).then(function() {
    console.log(...arguments);
  });
  */
  /*
  models.User.find({ where: { email: 'admin@verint.com ' } }).then(function(user) {
    user.update({ password: 'adsdfa' }).then(function() {
      console.log('user.validPassword?');
      user.validPassword('adsfa', function(err, isMatch) {
        console.log('validPassword?');
        console.log(...arguments);
        console.log('is match: ' + isMatch);
      });
    });
  })
  */
});

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());
app.use(logger('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4001");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);

const server = app.listen(config.port, () => {
  console.log(`Your server is running on port ${config.port}.`);
});


