const passport          = require('passport');
const models            = require('../models');
const config            = require('./index');
const JwtStrategy       = require('passport-jwt').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const LocalStrategy     = require('passport-local');

// Overriding some of the passport options so we can use email vs. username default
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  console.log('passport.localLogin working?')
  models.User.findOne({ where: { email: email } }).then(function(user) {
    if (!user) { 
      return done(null, false, { 
        error: 'Your login details could not be verified. Please try again.' 
      }); 
    }

    user.isValidPassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) {
        return done(null, false, { 
          error: 'Your login details could not be verified. Please try again.'
        });
      }

      return done(null, user);
    });
  });
});

const jwtOpts = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOpts, function(payload, done) {
  console.log('passport.jwtLogin working?')
  console.log(payload);
  models.User.findOne({ where: { email: payload.email } }).then(function(user) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
});

passport.use(jwtLogin);
passport.use(localLogin);