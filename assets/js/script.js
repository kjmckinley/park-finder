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

mapboxgl.accessToken = 'pk.eyJ1Ijoibml6enlubyIsImEiOiJja21zanJpeWYwaWwzMm9wZnlpbWtzMG1vIn0.OgJmZwe7N5Zy3QWgnhM4vw';

// navigator.geolocation.getCurrentPosition(successLocation); get current location
navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    console.log(position);
    setUpMap([position.coords.longitude, position.coords.latitude])
};

function errorLocation() {
    setUpMap([-97.7360259, 30.4390489])
};

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

    //add marker to set coordinates
    // Set options
var marker = new mapboxgl.Marker({
    color: "green",
    draggable: true
    }).setLngLat([-97.7360259, 30.4390489])
    .addTo(map);

};

// Add event listener to search button
// let buttonEl = document.getElementById("find-park");
// buttonEl.addEventListener("click", function () {
//     console.log(parkSearch);
// });

// get.addEventListener("click", function () {
//     // call api
// });

// let lat = 30.4390489;
// let lng = -97.7360259;

// let marker = new mapboxgl.Marker()
// .setLngLat([lng, lat])
// .addTo(map);

// Park search click event

// var searchEl = 
// parkSearch 

// var geojson = {
//     type: 'FeatureCollection',
//     features: [
//         {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [38.9071923, -77.0368707 ]
//             },
//             properties: {
//                 title: 'Mapbox',
//                 description: 'Washington, D.C.'
//             }
//         },
//         {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [37.7749295, -122.4194155]
//             },
//             properties: {
//                 title: 'Mapbox',
//                 description: 'San Francisco, Ca'
//             }
//         }
//     ]
// };

// // add markers to map
// geojson.features.forEach(function (marker) {
//     // create a DOM element for the marker
//     var el = document.createElement('div');
//     console.log(marker.geometry.coordinates);
//     el.className = 'marker';
//     el.style.backgroundImage =
// 'url(https://placekitten.com/g/' +
// marker.properties.iconSize.join('/') +
// '/)';
// el.style.width = marker.properties.iconSize[0] + 'px';
// el.style.height = marker.properties.iconSize[1] + 'px';
// el.style.backgroundSize = '100%';
//     // add marker to map
//     new mapboxgl.Marker(el)
//         .setLngLat(marker.geometry.coordinates)
//         .addTo(map);
// });

setUpMap();
parkSearch();