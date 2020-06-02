var map;
var service;
var infowindow;

function setMapLocation() {
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let state = document.getElementById("state").value;
  //let lga = document.getElementById("lga").value;

  let fullAddress = `${address}` + ` ${city}` + ` ${state}`;

  //getLocation("New York");

  initMap(fullAddress);
}

function initMap(sellerAddress) {
  var warri = new google.maps.LatLng(5.5544, 5.7932);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: warri,
    zoom: 15,
  });

  var request = {
    query: sellerAddress,
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
  //console.log("map shown");

  getLocation(sellerAddress);
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

//Function to covert address to Latitude and Longitude
function getLocation(address) {
  //console.log("geolocation");
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      let latitude = results[0].geometry.location.lat();
      let longitude = results[0].geometry.location.lng();
      document.getElementById("lat").innerHTML = latitude;
      document.getElementById("lng").innerHTML = longitude;
      //console.log(latitude, longitude);
    }
  });
}
