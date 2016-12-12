const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  sequelize.authenticate().then(function(errors) { console.log(errors) });
  
  var User = sequelize.define('User', {
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: {
        isEmail: true
      },
      set: function(val) {
        this.setDataValue('email', val.toLowerCase());
      }
    },
    firstName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    lastName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    resetPwdToken: { 
      type: DataTypes.STRING
    },
    resetPwdExpires: {
      type: DataTypes.DATE
    }
  },
  {
    classMethods: {
      generateHash : function (password, done) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, null, done); 
        });
      }
    },
    instanceMethods: {
      isValidPassword : function (password, next) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
          if (err) { return next(err); }

          next(null, isMatch);
        })
      }
    }
  }
);

  User.beforeBulkUpdate(function(options) {
    console.log("################# User.beforeBulkUpdate #################");    
  })

  User.beforeUpdate(function(model, opts, done) {
    const SALT_FACTOR = 5;
    console.log("################# User.beforeUpdate #################");
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(model.password, salt, null, function (err, encrypted) {
        console.log('Using beforeUpdate to generate encrypted password');
        console.log(err);
        if (err) return done(err);
        model.password = encrypted;
        done();
      });     
    })
  });

  User.beforeCreate(function(model, opts, done) {
    const SALT_FACTOR = 5;
    console.log("################# User.beforeSave #################");
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(model.password, salt, null, function (err, encrypted) {
        console.log('Using beforeCreate to generate encrypted password');
        console.log(err);
        if (err) return done(err);
        console.log(encrypted);
        model.password = encrypted;
        done();
      });     
    })
  });

  return User;
}