var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Digital Tech'
  });
});

router.post('/', function(request, response) {
  response.redirect('/login');
});

module.exports = router;