const RelationalDbStore = require("jsonapi-store-relationaldb")

const store = new RelationalDbStore({
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  database: 'jsonapi',
  username: 'root',
  password: 'blue',
  logging: false
});

module.exports = store;