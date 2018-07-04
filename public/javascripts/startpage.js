var map, marker, geocoder;

function qrscanner(){
    console.log("clicked");
    window.location.href = "./qrscanner";
}

function displaymap(locations){
    window.location.href = "./displaymap";
    displayAll()
}

function goBack( e ){
    window.history.back();
}

// General Map Setup
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16
    });

    geocoder = new google.maps.Geocoder;



    // var infowindow = new google.maps.InfoWindow();
    // var service = new google.maps.places.PlacesService(map);

}

function displayAll(){
    displayStores();
    displayRestaurants();
}

function retreieveLatLong(locations){
    for (var i = 0; i < locations.length; i++) {
        var placeId = locations[i].placeId;

        geocode.geocode({"placeId": placeId}, function(results){
            results = results[i].geometry.location
        })

        
    }

    // import existing locations
    // run geocoder.geocode({"placeid": PLACEID}, FUNCTION(RESULTS))
    // results is results[0].geometry.location
    // POST to server db
    // server should write to the db and update locasations
}

function displayStores(){
    $.ajax({
        method: "GET",
        url: "/api/mastersheet",
        dataType: "json",
    }).fail(function(err){
        console.error("Mastersheet call failed.", err)
    }).always(function(){
        console.info("Processing mastersheet call.")
    }).done(function(data){
        generateDisplays(data);
    })
}

function generateDisplays(locations){
    for(var i = 0 ; i < locations.length;  i++) {
        var placeId = locations[i].placeId;



        // var infowindow = new google.maps.InfoWindow();
        // var service = new google.maps.places.PlacesService(map);
    
        // service.getDetails(
        //   {
        //  placeId: placeIdInfo
        //   }, function(place, status) {
        //     if (status === google.maps.places.PlacesServiceStatus.OK)
        //     {
        //    var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
        //          var marker = new google.maps.Marker(
        //         {
        //           map: map,
        //           position: place.geometry.location,
        //                icon: iconBase + 'icon-gallery.png'
        //         });
        //         console.log("ping me bitch");
        //       google.maps.event.addListener(marker, 'click', function()
        //         {
        //         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id	+ '<br>' + '<br>'	+ '<b>Adress:</b>' + '<br>'	+ place.formatted_address	+ '</div>'+ '<br>' + 'Opening Times:' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1]	+ '<br>' + place.opening_hours.weekday_text[2]	+ '<br>' + place.opening_hours.weekday_text[3]	+ '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
        //         infowindow.open(map, this);
        //             });
        //           }
        //   });
    }
}

function displayRestaurants(){
    //get the shit from the eet.nu database
    
    var request = new XMLHttpRequest();

    request.open('GET', 'http://api.eet.nu/venues?geolocation=52.2208%2C6.89114', true);
    request.onload = function () {

        var data = JSON.parse(this.response);
        // console.log(data.results);
        generateRestaurants(data);
    }
    request.send();
}

function generateRestaurants( data ){
    console.log(data.results);
    for(var i = 0 ; i < data.results.length;  i++) {
        var names = data.results[i].name;
        var latitude = data.results[i].geolocation.latitude;
        var longitude = data.results[i].geolocation.longitude;
        // console.log( latitude );

    //     var infowindow = new google.maps.InfoWindow();
    //     var service = new google.maps.places.PlacesService(map);
    
       marker = new google.maps.Marker({
           map: map,
           position: {lat: latitude,lng: longitude}
       });
       
       
        // service.getDetails(
        //   {
        //  placeId: placeIdInfo
        //   }, function(place, status) {
        //     if (status === google.maps.places.PlacesServiceStatus.OK)
        //     {
        //    var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
        //          var marker = new google.maps.Marker(
        //         {
        //           map: map,
        //           position: ,
        //           icon: iconBase + 'icon-gallery.png'
        //         });
        //         console.log("ping me bitch");
        //       google.maps.event.addListener(marker, 'click', function()
        //         {
        //         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id	+ '<br>' + '<br>'	+ '<b>Adress:</b>' + '<br>'	+ place.formatted_address	+ '</div>'+ '<br>' + 'Opening Times:' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1]	+ '<br>' + place.opening_hours.weekday_text[2]	+ '<br>' + place.opening_hours.weekday_text[3]	+ '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
        //         infowindow.open(map, this);
        //             });
        //          }
        //   });
    }
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