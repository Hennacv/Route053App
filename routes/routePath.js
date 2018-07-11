var express = require('express');
var router = express.Router();

router.get('/qr/route/:dataString', function(req, res, next) {
  res.render('routePath', { title: 'Route 053 | Determining Route', dataString: req.params.dataString });
});

module.exports = router;