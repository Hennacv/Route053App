var express = require('express');
var router = express.Router();

router.get('/qr/route/:link', function(req, res, next) {
  res.render('routePath', { title: 'Route 053 | Determining Route', link: req.params.link });
});

module.exports = router;