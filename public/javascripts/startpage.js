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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16
    });

    geocoder = new google.maps.Geocoder;
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

function retreieveLatLong(locations){
    for (var i = 0; i < locations.length; i++) {
        var placeId = locations[i].placeId;

        geocoder.geocode({"placeId": placeId}, function(results, status){
            locations[i].location = results[0].geometry.location
        })
    }
}

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
    var lat, lng;
    if(latlon.charAt(0) === "@"){
        var latlng = latlon.slice(1);
        lat = parseFloat(latlng.split(',')[0]);
        lng = parseFloat(latlng.split(',')[1]);
    }
    var location = { lat: lat, lng: lng}
    addMarker(location, true);
}

function displayKML(link){
    console.log("link:", link);
}