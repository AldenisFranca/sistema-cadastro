var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Projeto Web',
    condition: false,
    nomes: ['Maria', 'José', 'Elias']
  });
});

module.exports = router;
