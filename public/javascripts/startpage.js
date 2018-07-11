var map, marker, geocoder, directionsDisplay, directionsService, markers = [];
var laLigna = "ChIJY-34S3IUuEcRQInBMslCYjE"
var laLignaLatLng = { lat: 52.2202142, lng: 6.89785119999999 }

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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16
    });

    // geocoder = new google.maps.Geocoder;
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
}

function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers(){
    setMapOnAll(null);
    markers = [];
}

// function retreieveLatLong(locations){
//     for (var i = 0; i < locations.length; i++) {
//         var placeId = locations[i].placeId;

//         geocoder.geocode({"placeId": placeId}, function(results, status){
//             locations[i].location = results[0].geometry.location
//         })
//     }
// }

// return all (winkels, restaurant, cultuur)
function displayAll(){
    retrieveLocations('mastersheet', false);
    retrieveLocations('restsheet', false);
    retrieveLocations('culturesheet', false);
}

function retrieveLocations(name, removeMarkers){
    $.ajax({
        method: "GET",
        url: `/api/${name}`,
        dataType: "json",
    }).fail(function(err){
        console.error("Mastersheet call failed.", err)
    }).always(function(){
        console.info("Processing mastersheet call.")
    }).done(function(data){
        createMarkers(data, removeMarkers);
    })
}

function createMarkers(locations, removeMarkers){
    if(removeMarkers) clearMarkers();
    for(var i = 0 ; i < locations.length;  i++) {
        var latitude = locations[i].latitude;
        var longitude = locations[i].longitude;
        const location = { lat: latitude, lng: longitude };

        if(location.hasOwnProperty("placeId")){
            var placeId = locations[i].placeId;
            var category = locations[i].category;
            var name = locations[i].name;
        }

        addMarker(location);
    }
}

function displayLatLon(latlon){
    // var chunks = latlon.split("|");
    var chunks = latlon.split(',')
    var location = {};
    var latlng;
    for( var i = 0; i < chunks.length; i++ ){
        if(chunks[i].charAt(0) === "@"){
            var placeId, lat, lng;
            var latlng = chunks[i].slice(1);
            placeId = chunks[0]
            lat = parseFloat(chunks[1]);
            lng = parseFloat(chunks[2]);
            location[placeId] = { lat: lat, lng: lng}
            latlng = { lat: lat, lng: lng};
            addMarker(location[placeId], true);
        }
    }
    console.log(location);
    getDirections(latlng);
}

function getDirections(destination){
    var request = {
        origin: laLignaLatLng,
        destination: destination,
        travelMode: "WALKING"
    }

    directionsService.route(request, function(result, status){
        if(status == "OK"){
            directionsDisplay.setDirections(result);
        }
    })

    directionsDisplay.setMap(map);
}

function displayKML(link){
    console.log("link:", link);
    // thing link needs to get parsed
    //divide each section with a "@"
    // @path|@coord1|@coord2
}