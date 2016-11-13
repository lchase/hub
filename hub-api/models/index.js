var fs          = require('fs');
var path        = require('path');
var Sequelize   = require("sequelize");
var config      = require(path.join(__dirname, '..', 'config'));
var sequelize   = new Sequelize(config.db.database, config.db.username, config.db.password, { 
                    host: config.db.host,
                    port: config.db.port,
                    dialect: config.db.driver });
var db          = {};

sequelize.drop();

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    console.log(model.name);
    db[model.name].sync();
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// Relationships
db['User'].hasMany(db['Dashboard']);
db['Dashboard'].belongsTo(db['User']);

db['User'].hasMany(db['Preference']);
db['Preference'].belongsTo(db['User']);

db['Dashboard'].belongsToMany(db['Widget'], { through: db['dashboardWidget'] });
db['Widget'].belongsToMany(db['Dashboard'], { through: db['dashboardWidget'] });

sequelize.sync();

//sequelize.sync({ force: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;