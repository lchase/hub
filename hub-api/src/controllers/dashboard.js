const models              = require('../models');
const JsonApiSerializer   = require('jsonapi-serializer').Serializer;
const DashboardSerializer = new JsonApiSerializer('dashboard', {
  attributes: ['name', 'description', 'Widgets'],
  Widgets: {
    ref: 'id',
    includedLinks: {
      self: function (record, current) {
        return 'http://localhost:4000/widgets/' + current.id;
      }
    },
    relationshipLinks: {
      related: function (record, current, parent) {
        return 'http://localhost:4000/dashboard/' + parent.id +
          '/widgets/' + current[0].id;
      }
    }
  }
});

exports.get = function(req, res, next) {
  models.Dashboard.find({
      where: { id: req.params.id },
      include: [{
        model: models.Widget
      }] 
  }).then(function(dashboard) {
    console.log(dashboard.get({ plain: true }));
    if (dashboard) {
      res.json(DashboardSerializer.serialize(dashboard));
    } else {
      res.json({ errors: [{
        status: "404",
        title: "Dashboard not found",
        detail: "Dashboard with the given id could not be found"
      }]})
    }    
  });
}

exports.list = function(req, res, next) {
  res.json({ content: 'Dashboard (protected) return list of dashboards'});
}

exports.create = function(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
}