var express = require('express');
var router = express.Router();
const inventoryDao = require('../services/inventoryDao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Yay!');
});

router.post('/addSkus', function(req, res, next) {
  const {skus} = req.body;
  inventoryDao.addSkus(skus);
  //res.send();
});

module.exports = router;
