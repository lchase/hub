const models              = require('../models');
const JsonApiSerializer   = require('jsonapi-serializer').Serializer;
const Serializer          = new JsonApiSerializer('preference', {
                              attributes: ['name', 'value', 'UserId']
                            });
const JsonApiDeserializer = require('jsonapi-serializer').Deserializer;
const Deserializer        = new JsonApiDeserializer();

exports.get = function(req, res, next) {
  models.Preference.findOne({where: { id: req.params.id } }).then(function(entity) {
    if (entity) {
      res.json(Serializer.serialize(entity));
    } else {
      res.json({ errors: [{
        status: "404",
        title: "Preference not found",
        detail: "Preference with the given id could not be found"
      }]})
    }    
  });
}

exports.getByUserId = function(req, res, next) {
  models.Preference.findAll({where: { UserId: req.params.id } }).then(function(entity) {
    if (entity) {
      res.json(Serializer.serialize(entity));
    } else {
      res.json({ errors: [{
        status: "404",
        title: "Preference not found",
        detail: "Preference with the given user id could not be found"
      }]})
    }    
  });
}

exports.list = function(req, res, next) {
  res.json({ content: 'Preference (protected) return list of preferences'});
}

function createOrUpdate(entity) {
  return models.Preference.findOne({where: { name: entity.name, UserId: entity.userId } })
    .then(function(existingEntity) {
      if (existingEntity) {
        return existingEntity.updateAttributes({
          value: entity.value
        });
      } else {
        return models.Preference.create({
          name: entity.name,
          value: entity.value,
          UserId: entity.userId
        });
      }
    });
}

exports.create = function(req, res, next) {
  Deserializer.deserialize(req.body, function (err, data) {
    if (data) {
        if (!Array.isArray(data)) {
          data = [data];
        }

        var promises = [];
        data.forEach(entry => {
          promises.push(createOrUpdate({
            name: entry["name"],
            userId: entry["user-id"],
            value: entry["value"]
          }));
        }) 

        Promise.all(promises).then(values => { 
          res.json(Serializer.serialize(values));
        }).catch(function(err) {
          // Will catch failure of first failed promise
          res.json({ errors: [{
            status: "400",
            title: "Problem creating/updating",
            detail: "Problem creating/updating entities"
          }]})
        });
      } else {
        res.json({ errors: [{
          status: "400",
          title: "Bad Request",
          detail: "Bad Preference Post Request"
        }]});
      }

  });
  
}