var jsonApi = require("jsonapi-server");
var fs = require("fs");
var path = require("path");

jsonApi.setConfig({
  // Put your config here!
  port: 4001,
  base: 'api',
  graphiql: true
});

// Load all the resources
fs.readdirSync(path.join(__dirname, "/resources")).filter(function(filename) {
  return /^[a-z].*\.js$/.test(filename);
}).map(function(filename) {
  return path.join(__dirname, "/resources/", filename);
}).forEach(require);

const express = jsonApi.getExpressServer();

/*
jsonApi.setConfig({
  graphiql: true,
  swagger: {
    title: 'Example JSON:API Server',
    version: '0.1.1',
    description: 'This is the API description block that shows up in the swagger.json',
    contact: {
      name: 'API Contact',
      email: 'apicontact@holidayextras.com',
      url: 'docs.hapi.holidayextras.com'
    },
    license: {
      name: 'MIT',
      url: 'http://opensource.org/licenses/MIT'
    }
  },
  protocol: 'http',
  hostname: 'localhost',
  port: 16006,
  base: 'rest',
  meta: {
    description: 'This block shows up in the root node of every payload'
  }
})

jsonApi.authenticate((request, callback) => {
  // If a "blockMe" header is provided, block access.
  if (request.headers.blockme) return callback('Fail')

  // If a "blockMe" cookie is provided, block access.
  if (request.cookies.blockMe) return callback('Fail')

  return callback()
})

jsonApi.onUncaughtException((request, error) => {
  const errorDetails = error.stack.split('\n')
  console.error(JSON.stringify({
    request,
    error: errorDetails.shift(),
    stack: errorDetails
  }))
})

server.getExpressServer = jsonApi.getExpressServer
*/


//const apiRoutes = express.Router();
//const authRoutes = express.Router();

// Auth Routes
//apiRoutes.use('/auth', authRoutes);

// Registration Route
//authRoutes.post('/register', AuthenticationController.register);

// Login Route
//authRoutes.post('/login', AuthenticationController.login);

jsonApi.start();