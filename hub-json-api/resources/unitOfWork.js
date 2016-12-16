var unitOfWorkHandler = require("../handlers/unitOfWorkHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "uow",
  handlers: unitOfWorkHandler,
  attributes: {
    summary: jsonApi.Joi.string(),
    description: jsonApi.Joi.string(),
    type: jsonApi.Joi.string(),
    created: jsonApi.Joi.date().default(Date.now, 'time of creation'),
  }
});

unitOfWorkHandler.populate();