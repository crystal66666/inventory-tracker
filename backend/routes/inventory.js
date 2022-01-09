var express = require('express');
var router = express.Router();
const inventoryDao = require('../services/inventoryDao');

router.get('/getSkus', function(req, res, next) {
  res.json(inventoryDao.listSkus());
});

router.post('/addSkus', function(req, res, next) {
  const {skus} = req.body;
  inventoryDao.addSkus(skus);
  //res.send();
});


module.exports = router;
