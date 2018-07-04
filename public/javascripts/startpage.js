var db = require('../initializesdk.js');
var locations = [];

db.ref("masterSheet").once('value').then(function(snapshot){
  var allItems = snapshot.val();
  for(let i = 0; i < allItems.length; i++){
    var placeId = allItems[i][4];
    var name = allItems[i][1];
    locations.push({ name: name, placeId: placeId });
  }
  console.log('locations:', locations);

})

console.log('locations:', locations);
function qrscanner(){
    console.log("clicked");
    window.location.href = "./qrscanner";
}

function displaymap(){
    console.log("clicked");
    window.location.href = "./displaymap";
    displayAll()
}

function goBack( e ){
    window.history.back();
}

// General Map Setup
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16
    });

    // var infowindow = new google.maps.InfoWindow();
    // var service = new google.maps.places.PlacesService(map);

}

function displayAll(){
    displayStores();
    displayRestaurants();
}

function displayStores(){
    for (var i = 0 ; i < locations.length;  i++) {
        var placeIdInfo = locations[i][4];

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
    
        service.getDetails(
          {
         placeId: placeIdInfo
          }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK)
            {
           var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
                 var marker = new google.maps.Marker(
                {
                  map: map,
                  position: place.geometry.location,
                       icon: iconBase + 'icon-gallery.png'
                });
              google.maps.event.addListener(marker, 'click', function()
                {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id	+ '<br>' + '<br>'	+ '<b>Adress:</b>' + '<br>'	+ place.formatted_address	+ '</div>'+ '<br>' + 'Opening Times:' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1]	+ '<br>' + place.opening_hours.weekday_text[2]	+ '<br>' + place.opening_hours.weekday_text[3]	+ '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
                infowindow.open(map, this);
                    });
                  }
          });
    }
}

function displayRestaurants(){
    //get the shit from the eet.nu database
    
    var request = new XMLHttpRequest();

    request.open('GET', 'http://api.eet.nu/venues?geolocation=52.2208%2C6.89114', true);
    request.onload = function () {

        var data = JSON.parse(this.response);
        console.log(data.results);
    }
    request.send();
}





// function displayRestaurants( data ) {
//     console.log(data);
//     console.log("work bitch");
// }

// function displayData(){

//     // if all stores clicked make a for loop that gets it all
//     service.getDetails(
//         {
//     placeId: 'ChIJRwShv3MUuEcRiY0kMa6o4pU' //Change place id in for loop to get all stores
//         }, function(place, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK)
//         {
//         var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
//             var marker = new google.maps.Marker(
//             {
//                 map: map,
//                 position: place.geometry.location,
//                     icon: iconBase + 'icon-theater.png' //change icon
//             });
//             google.maps.event.addListener(marker, 'click', function()
//             {
//             infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id	+ '<br>' + '<br>'	+ '<b>Adress:</b>' + '<br>'	+ place.formatted_address	+ '</div>'+ '<br>' + 'Opening Times:' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1]	+ '<br>' + place.opening_hours.weekday_text[2]	+ '<br>' + place.opening_hours.weekday_text[3]	+ '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
//             infowindow.open(map, this);
//                 });
//                 }
//         });

//     // if winkels clicked make a for loop that gets all the clothing stores

//     service.getDetails(
//         {
//     placeId: 'ChIJRwShv3MUuEcRiY0kMa6o4pU' //Change place id in for loop to get all stores
//         }, function(place, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK)
//         {
//         var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
//             var marker = new google.maps.Marker(
//             {
//                 map: map,
//                 position: place.geometry.location,
//                     icon: iconBase + 'icon-theater.png' //change icon
//             });
//             google.maps.event.addListener(marker, 'click', function()
//             {
//             infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id	+ '<br>' + '<br>'	+ '<b>Adress:</b>' + '<br>'	+ place.formatted_address	+ '</div>'+ '<br>' + 'Opening Times:' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1]	+ '<br>' + place.opening_hours.weekday_text[2]	+ '<br>' + place.opening_hours.weekday_text[3]	+ '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
//             infowindow.open(map, this);
//                 });
//                 }
//         });

//    // if Restaurant clicked make a for loop that gets all the rest

//    service.getDetails(
//     {
// placeId: 'ChIJRwShv3MUuEcRiY0kMa6o4pU' //Change place id in for loop to get all stores
//     }, function(place, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK)
//     {
//     var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
//         var marker = new google.maps.Marker(
//         {
//             map: map,
//             position: place.geometry.location,
//                 icon: iconBase + 'icon-theater.png' //change icon
//         });
//         google.maps.event.addListener(marker, 'click', function()
//         {
//         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id	+ '<br>' + '<br>'	+ '<b>Adress:</b>' + '<br>'	+ place.formatted_address	+ '</div>'+ '<br>' + 'Opening Times:' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1]	+ '<br>' + place.opening_hours.weekday_text[2]	+ '<br>' + place.opening_hours.weekday_text[3]	+ '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
//         infowindow.open(map, this);
//             });
//             }
//     });
//    // if culture clicked make a for loop that gets all culture spots

//    service.getDetails(
//     {
// placeId: 'ChIJRwShv3MUuEcRiY0kMa6o4pU' //Change place id in for loop to get all stores
//     }, function(place, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK)
//     {
//     var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
//         var marker = new google.maps.Marker(
//         {
//             map: map,
//             position: place.geometry.location,
//                 icon: iconBase + 'icon-theater.png' //change icon
//         });
//         google.maps.event.addListener(marker, 'click', function()
//         {
//         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id	+ '<br>' + '<br>'	+ '<b>Adress:</b>' + '<br>'	+ place.formatted_address	+ '</div>'+ '<br>' + 'Opening Times:' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1]	+ '<br>' + place.opening_hours.weekday_text[2]	+ '<br>' + place.opening_hours.weekday_text[3]	+ '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
//         infowindow.open(map, this);
//             });
//             }
//     });
// }