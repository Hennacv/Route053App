var express = require('express');
var router = express.Router();

router.get('/qr/location/:object', function(req, res, next) {
  res.render('objectRoute', { title: 'Route 053', latlon: req.params.object });
});

module.exports = router;