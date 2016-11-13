const jwt       = require('jsonwebtoken');  
const crypto    = require('crypto');
const models    = require('../models');
const config    = require('../config');

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

function setUserInfo(request) {
  return {
    id: request.id,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    role: request.role
  }
}

// Login Route
exports.login = function(req, res, next) {
  models.User.findOne({ where: { email: req.body.email } }).then(function(existingUser) {
    
    if (!existingUser) {
      console.log('User not found...');
      return res.status(401).json({ 
        error: 'Unauthorized' 
      });
    }
    console.log('User found...');
    existingUser.isValidPassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ 
          error: 'The username or password provided is not valid.' 
        });
      } else {
        let userInfo = {
          id: existingUser.id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email
        };

        res.status(200).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      }
    })
  });
}

exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  models.User.findOne({ where: { email: email } }).then(function(existingUser) {
    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    models.User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }).then(function() {
      models.User.findOne({where: { email: email } }).then(function(newUser) {
        let userInfo = setUserInfo(newUser.get({ plain: true }));

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        

        // Respond with JWT if user was created
        res.status(200).json({
          token: 'JWT ' + generateToken(newUser.get({ plain: true })),
          user: userInfo
        });
      });
    });
  });
}