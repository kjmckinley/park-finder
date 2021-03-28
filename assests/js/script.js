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

let lat = 30.4390489;
let lng = -97.7360259;
mapboxgl.accessToken = 'pk.eyJ1Ijoibml6enlubyIsImEiOiJja21zanJpeWYwaWwzMm9wZnlpbWtzMG1vIn0.OgJmZwe7N5Zy3QWgnhM4vw';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    // center: [-97.7360259, 30.4390489],
    center: [lng, lat],
    zoom: 13
});

parkSearch();