var commentHandler = require("../handlers/commentHandler.js");
var jsonApi = require("jsonapi-server");

jsonApi.define({
  resource: "comments",
  handlers: commentHandler,
  attributes: {
    title: jsonApi.Joi.string(),
    url: jsonApi.Joi.string().uri(),
    height: jsonApi.Joi.number().min(1).max(10000).precision(0),
    width: jsonApi.Joi.number().min(1).max(10000).precision(0),
    created: jsonApi.Joi.date().default(Date.now, 'time of creation')/*,
    author: jsonApi.Joi.one('people')
      .description('The person who wrote the comment')*/
  }
});

commentHandler.populate();