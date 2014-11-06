var express = require('express');
var router = express.Router();

// ----- GET / : homepage -----------------------------------------------------
router.get('/', function(req, res) {
  res.render('index', {});
});

// ----- GET /about/ : page explaining authors/how to use ---------------------
router.get('/about/', function(req, res) {
  res.render('about', {});
});

module.exports = router;
