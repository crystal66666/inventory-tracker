var express = require('express');
var router = express.Router();
const inventoryDao = require('../services/inventoryDao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
