var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://route053-bc66e.firebaseio.com/'
});

  // Set the configuration for your app
  // TODO: Replace with your project's config object
// var config = {
//     apiKey: "AIzaSyCHKShA4uvFY2RE3Cr7ThtwOVp3hbW7noU",
//     authDomain: "route053-bc66e.firebaseapp.com",
//     databaseURL: "https://route053-bc66e.firebaseio.com",
//     storageBucket: "route053-bc66e.appspot.com",
//     messagingSenderId: "212758806246"
//   };
//   firebase.initializeApp(config);

  // Get a reference to the database service
  // var database = firebase.database();

var db = admin.database();
module.exports = db;