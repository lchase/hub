module.exports = {
  port: process.env.PORT || 4000,
  secret: 'super secret passphrase',
  db: {
    driver: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'blue',
    database: 'hub'
  }
};