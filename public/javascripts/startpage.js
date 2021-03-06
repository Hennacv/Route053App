var map, marker, geocoder, directionsDisplay, directionsService, service, infowindow, markers = [];
var laLigna = "ChIJY-34S3IUuEcRQInBMslCYjE"
var laLignaLatLng = { lat: 52.2202142, lng: 6.89785119999999 }

function qrscanner(){
    console.log("clicked");
    window.location.href = "./qrscanner";
}

function displaymap(locations){
    window.location.href = "./displaymap";
}

function goBack( e ){
    window.history.back();
}

function initMap() {
    console.log("initmap")
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16
    });

    // geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
}

function displayAll(){
    initMap();
    retrieveLocations('mastersheet', false);
    retrieveLocations('restsheet', false);
    retrieveLocations('culturesheet', false);
}

function retrieveLocations(name, removeMarkers){
    // if(removeMarkers) clearMarkers();
    $.ajax({
        method: "GET",
        url: `/api/${name}`,
        dataType: "json",
    }).fail(function(err){
        console.error("Mastersheet call failed.", err)
    }).always(function(){
        console.info("Processing mastersheet call.")
    }).done(function(data){
        console.log("incoming data:", data);
        createMarkers(data, removeMarkers);
        // setMapOnAll();
    })
}

function createMarkers(locations, removeMarkers){
    if(removeMarkers) clearMarkers();
    // console.log("loc:", locations);
    for(var i = 0 ; i < locations.length;  i++) {
        var latitude = locations[i].latitude;
        var longitude = locations[i].longitude;
        var location = { lat: latitude, lng: longitude };

        if(location.hasOwnProperty("placeId")){
            var placeId = locations[i].placeId;
            var category = locations[i].category;
            var name = locations[i].name;
        }
        addMarker(location);
    }
    // setMapOnAll();
}


function addMarker(location) {
    // console.log("placeId:", location);
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
    service.getDetails({
        placeId: location
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var iconBase = 'http://chananbos.com/pinkball/icons/';
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                //  icon: iconBase + 'poolmarker.png'
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(
                    '<div><strong>' + place.name + '</strong><br>' +
                    '<br>'
                    + '<b>Adress:</b>'
                    + '<br>'
                    + place.formatted_address
                    + '</div>'
                    + '<br>'
                    + '<b>Opening Times:</b>'
                    + '<br>'
                    + place.opening_hours.weekday_text[0]
                    + '<br>'
                    + place.opening_hours.weekday_text[1]
                    + '<br>'
                    + place.opening_hours.weekday_text[2]
                    + '<br>'
                    + place.opening_hours.weekday_text[3]
                    + '<br>'
                    + place.opening_hours.weekday_text[4]
                    + '<br>'
                    + place.opening_hours.weekday_text[5]
                    + '<br>'
                    + place.opening_hours.weekday_text[6]
                );
                infowindow.open(map, this);
            });
        }
    });
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers(){
    setMapOnAll(null);
    markers = [];
    console.log("after clearing markers", markers)
}

function displayLatLon(latlon){
    console.log("displayLatLon");
    // var chunks = latlon.split("|");
    initMap();
    var chunks = latlon.split(',')
    var location = {};
    var latlng;
    for( var i = 0; i < chunks.length; i++ ){
        if(chunks[i].charAt(0) === "@"){
            var placeId, lat, lng;
            var latlng = chunks[i].slice(1);
            console.log("typeof:", typeof(chunks[0]));
            placeId = String(chunks[0]).substring(1);
            lat = parseFloat(chunks[1]);
            lng = parseFloat(chunks[2]);
            location[placeId] = { lat: lat, lng: lng}
            latlng = { lat: lat, lng: lng};
            addMarker(placeId, true);
        }
    }
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

function findPath(dataString){
    var waypoints = [], markers = [], dataArr = dataString.split('@').slice(1);

    for(let i = 0; i < dataArr.length; i++){
        var chunk = dataArr[i].split(',')
        waypoints.push({ location: { lat: parseFloat(chunk[1]), lng: parseFloat(chunk[2]) }, stopover: true })
        markers.push(chunk[0])
    }
    createWayPointsMap("map", waypoints, markers);
}

function createWayPointsMap(id, waypoints, markers) {
    map = new google.maps.Map(document.getElementById(id), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16.6
    });
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    var request = {
        origin: laLignaLatLng,
        destination: waypoints[1].location,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: "WALKING"
    }

    directionsService.route(request, function(result, status){
        if(status == "OK"){
            directionsDisplay.setDirections(result);
        } else {
            console.error("WAYPOINTS MAP ERROR:", result, status)
        }
    })

    directionsDisplay.setMap(map);

    for(let i = 0; i < markers.length; i++){
        addPlaceMarker(markers[i])
    }

    return true;
}

function addPlaceMarker(marker){
    service.getDetails({
        placeId: marker
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var iconBase = 'http://chananbos.com/pinkball/icons/';
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                // icon: iconBase + 'icon-poolen.png'
            });
            google.maps.event.addListener(marker, 'click', function() {
                if(place.opening_hours){
                    infowindow.setContent(
                        '<div><strong>' + place.name + '</strong><br>' +
                        '<br>'
                        + '<b>Adress:</b>'
                        + '<br>'
                        + place.formatted_address
                        + '</div>'
                        + '<br>'
                        + '<b>Opening Times:</b>'
                        + '<br>'
                        + place.opening_hours.weekday_text[0]
                        + '<br>'
                        + place.opening_hours.weekday_text[1]
                        + '<br>'
                        + place.opening_hours.weekday_text[2]
                        + '<br>'
                        + place.opening_hours.weekday_text[3]
                        + '<br>'
                        + place.opening_hours.weekday_text[4]
                        + '<br>'
                        + place.opening_hours.weekday_text[5]
                        + '<br>'
                        + place.opening_hours.weekday_text[6]
                    );
                    infowindow.open(map, this);
                } else {
                    infowindow.setContent(
                        '<div><strong>' + place.name + '</strong><br>' +
                        '<br>'
                        + '<b>Adress:</b>'
                        + '<br>'
                        + place.formatted_address
                    );
                    infowindow.open(map, this);
                }
            });
        }
    });
}