const express       = require('express');
const router        = express.Router();
const Defect        = require('../models/defect');
const ObjectId      = require('mongoose').Types.ObjectId;

router.route('/')
  .post((req, res) => {
    let defect = new Defect();
    defect.summary = req.body.summary;

    defect.save((err) => {
      if (err)
        res.send(err);
      res.json({ message: 'defect created!' });
    })
  })
  .get((req, res) => {
    Defect.find((err, defects) => {
      if (err)
        res.send(err);
      res.json(defects);
    })
  });
router.route('/:id')
  .put((req, res) => {
    Defect.findById({ _id: new ObjectId(req.params.id) }, function(err, defect) {
      if (err) res.send(err);

      defect.summary = req.body.summary;

      defect.save(function(err) {
        if (err) res.send(err);

        res.json({ message: 'defect updated!' });
      })
    })
  });

module.exports = router;