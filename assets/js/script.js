// PARK BUDDY
// PARK BUDDY

let parkSearch = function (park) {
    let apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Texas.json?access_token=pk.eyJ1Ijoibml6enlubyIsImEiOiJja21zanJpeWYwaWwzMm9wZnlpbWtzMG1vIn0.OgJmZwe7N5Zy3QWgnhM4vw";
    // https://api.mapbox.com/{endpoint}?access_token={your_access_token}
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                // console.log(response)

            });
        }
    })
};

// let lat = 30.4390489;
// let lng = -97.7360259;
mapboxgl.accessToken = 'pk.eyJ1Ijoibml6enlubyIsImEiOiJja21zanJpeWYwaWwzMm9wZnlpbWtzMG1vIn0.OgJmZwe7N5Zy3QWgnhM4vw';

// navigator.geolocation.getCurrentPosition(successLocation); get current location
navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    console.log(position);
    setUpMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setUpMap([-97.7360259, 30.4390489])
}

function setUpMap(center) {
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        // center: [-97.7360259, 30.4390489],
        // center: [lng, lat],
        center: center,
        zoom: 10
    })

    // Add zoom and rotation controls to the map.
    let nav = new mapboxgl.NavigationControl()
    map.addControl(nav);

    let directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })

    map.addControl(directions, "top-left");

};

var geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-77.0368707, 38.9071923]
            },
            properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-122.4194155, 37.7749295]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, Ca'
            }
        }
    ]
};

// add markers to map
geojson.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});

setUpMap();
parkSearch();