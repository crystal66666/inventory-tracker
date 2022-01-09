var express = require('express');
var router = express.Router();
const debug = require('debug')('backend:db');
const inventoryDao = require('../services/inventoryDao');

router.get('/list', function(req, res, next) {
  res.json(inventoryDao.list());
});

router.post('/add', function(req, res, next) {
  const {name, quantity} = req.body;
  inventoryDao.add(name, quantity);
  res.end();
});

router.post('/update', function(req, res, next) {
  const {id, field, value} = req.body;
  inventoryDao.update(id, field, value);
  res.end();
});

router.post('/delete', function(req, res, next) {
  const {id} = req.body;
  inventoryDao.delete(id);
  res.end();
});

module.exports = router;
