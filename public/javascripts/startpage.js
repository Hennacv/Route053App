var map, marker, geocoder, markers = [];

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
    displayCulture();
}

function retreieveLatLong(locations){
    for (var i = 0; i < locations.length; i++) {
        var placeId = locations[i].placeId;
        console.log("current location: ", locations[i].name)

        geocoder.geocode({"placeId": placeId}, function(results, status){
            console.log("res:", status);
            locations[i].location = results[0].geometry.location
        })
    }

    console.log("updated locations");

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
        retreieveLatLong(data);
    })
}

function generateDisplays(locations){
    // $('map').remove(marker);
    for(var i = 0 ; i < locations.length;  i++) {
        var placeId = locations[i].placeId;
        var latitude = locations[i].latitude;
        var longitude = locations[i].longitude;
        var category = locations[i].category;
        var name = locations[i].name;

        // console.log(category);
        // console.log(name);
        

        marker = new google.maps.Marker({
            map: map,
            position: {lat: latitude,lng: longitude}
        });
        markers.push(marker);

        // console.log(markers);

    }
}

function setMapOnAll(map){
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);   
    }
}

function clearMarkers(){
    setMapOnAll(null);
}

function displayRestaurants(){
    // console.log("clicked");

    $.ajax({
        method: "GET",
        url: "/api/restsheet",
        dataType: "json",
    }).fail(function(err){
        console.error("Restsheet call failed.", err)
    }).always(function(){
        console.info("Processing Restsheet call.")
    }).done(function(data){
        // console.log("work bitch")
        generateRestaurants(data);
    })
    //get the shit from the eet.nu database
    
    // var request = new XMLHttpRequest();

    // request.open('GET', 'http://api.eet.nu/venues?geolocation=52.2208%2C6.89114', true);
    // request.onload = function () {

    //     var data = JSON.parse(this.response);
    //     console.log(data.results);
    //     // generateRestaurants(data);
    // }
    // request.send();
}

function generateRestaurants( restaurants ){
    // console.log(data);
    for(var i = 0 ; i < restaurants.length;  i++) {
        var latitude = restaurants[i].latitude;
        var longitude = restaurants[i].longitude;
        var name = restaurants[i].name;
        // console.log( name);

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


function displayCulture(){
    $.ajax({
        method: "GET",
        url: "/api/culturesheet",
        dataType: "json",
    }).fail(function(err){
        console.error("Culturesheet call failed.", err)
    }).always(function(){
        console.info("Processing culturesheet call.")
    }).done(function(data){
        generateCultures(data);
    })
}

function generateCultures(cultures){
    for(var i = 0 ; i < cultures.length;  i++) {
        var placeId = cultures[i].placeId;
        var latitude = cultures[i].latitude;
        var longitude = cultures[i].longitude;

        marker = new google.maps.Marker({
            map: map,
            position: {lat: latitude,lng: longitude}
        });
    }
}