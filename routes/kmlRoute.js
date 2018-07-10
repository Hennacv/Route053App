var express = require('express');
var router = express.Router();

router.get('/qr/kml/:link', function(req, res, next) {
  res.render('kmlRoute', { title: 'Route 053', link: req.params.link });
});

module.exports = router;