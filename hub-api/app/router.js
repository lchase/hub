const AuthenticationController = require('./controllers/authentication');
const DashboardController = require('./controllers/dashboard');
const PreferenceController = require('./controllers/preference');
const express = require('express');
const passport = require('passport');

require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  // Auth Routes
  apiRoutes.use('/auth', authRoutes);

  // Registration Route
  authRoutes.post('/register', AuthenticationController.register);

  // Login Route
  authRoutes.post('/login', AuthenticationController.login);

  // Test protected route
  apiRoutes.get('/protected', requireAuth, function(req, res) {
    res.send({ content: 'The protected test route is functional!'});
  });

  // Dashboard
  apiRoutes.get('/dashboard', DashboardController.list)
  apiRoutes.get('/dashboard/:id', DashboardController.get)

  // Preference
  apiRoutes.get('/preference/:id', PreferenceController.get);
  apiRoutes.post('/preference', PreferenceController.create);
  apiRoutes.get('/preference/user/:id', PreferenceController.getByUserId);

  // Set url for api group
  app.use('/api', apiRoutes);
}