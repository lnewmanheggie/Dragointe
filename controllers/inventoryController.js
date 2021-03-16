const db = require("../models");

// Defining methods for the inventoryController
module.exports = {
  findAll: function(req, res) {
    db.Inventory
      .find(req.query)
      .sort({ name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Inventory
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Inventory
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateAdd: function(req, res) {
    db.Inventory
      .findOneAndUpdate({ barcode: req.body.barcode }, { $inc: { count: req.body.count }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateRemove: function(req, res) {
    db.Inventory
      .findOneAndUpdate({ barcode: req.body.barcode }, { $inc: { count: -req.body.count }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Inventory
      .find({ barcode: req.params.barcode })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};