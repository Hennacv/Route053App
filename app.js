var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
var db = require('./initializesdk.js');

var indexRouter = require('./routes/index');
var qrscannerRouter = require('./routes/qrscanner');
var dismapRouter = require('./routes/displaymap');
var routePath = require('./routes/routePath')
var objectRoute = require('./routes/objectRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3071);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/qrscanner', qrscannerRouter);
app.use('/displaymap', dismapRouter);
// app.use('/kmlRoute', kmlRoute);
// app.use('/objectRoute', objectRoute);
app.get('/qr/route/:link', function(req, res, next){
  res.render('routePath', { title: 'Generating Route', link: req.params.link });
});
app.get('/qr/location/:object', function(req, res, next){
  res.render('objectRoute', { title: 'Finding Location', latlon: req.params.object });
});

router.route("/api/mastersheet").get(function(req, res) {
  var locations = [];

  db.ref("masterSheet").once('value').then(function(snapshot){

    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
        var placeId = allItems[i][4];
        var name = allItems[i][1];
        var category = allItems[i][2];
        var latitude = allItems[i][7];
        var longitude = allItems[i][8];

        locations.push({ name: name, placeId: placeId, latitude: latitude, longitude: longitude, category: category});
    }
    console.log("locs:", locations);
    res.send(locations);
    })
})

router.route("/api/culturesheet").get(function(req, res) {
  var cultures = [];

  db.ref("cultureSheet").once('value').then(function(snapshot){

    var allItems = snapshot.val();
    for(let i = 1; i < allItems.length; i++){
        var placeId = allItems[i][4];
        var name = allItems[i][1];
        var latitude = allItems[i][7];
        var longitude = allItems[i][8];

        cultures.push({ name: name, placeId: placeId, latitude: latitude, longitude: longitude});
    }
    console.log("cults:", cultures);
    res.send(cultures);
    })
})


router.route("/api/restsheet").get(function(req, res) {
  var restaurants = [];
  console.log("step1");

  db.ref("restSheet").once('value').then(function(snapshot){
    console.log("step2");
    // console.log(snapshot)

    var allRestaurants = snapshot.val();
    console.log("step3");
    console.log(allRestaurants);
    for(var i = 1; i < allRestaurants.length; i++){
        var name = allRestaurants[i][0];
        var latitude = allRestaurants[i][5];
        var longitude = allRestaurants[i][6];
        console.log("step4")

        restaurants.push({ name: name, latitude: latitude, longitude: longitude});
    }
    console.log("rests:", restaurants);
    res.send(restaurants);
    })
})

app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'));

module.exports = app;