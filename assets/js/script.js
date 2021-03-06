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
// navigator.geolocation.getCurrentPosition(successLocation,
//     errorLocation, {
//     enableHighAccuracy: true
// })

function successLocation(position) {
    console.log(position);
    setUpMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setUpMap([-97.7360259, 30.4390489])
}

function setUpMap() {
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        // center: [-97.7360259, 30.4390489],
        // center: [lng, lat],
        center: [-95.67515759999999, 39.0473451],
        zoom: 3
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
// var marker = new mapboxgl.Marker({
//     color: "green",
//     draggable: true
//     }).setLngLat([-95.67515759999999, 39.0473451])
//     .addTo(map);
};

// Used from rposner16
function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

// Displays the results of the user search
function displayResults(responseJson, userResultsnum) {
    console.log(responseJson);
    // Clearing previous results
    $('.js-error-message').empty();
    $('.list-of-results').empty();
    // Looping through the search and populating results
    for (let i = 0; i < responseJson.data.length & i < userResultsnum; i++) {
        $('.list-of-results').append(`<li><h3><a class ='park-title' target = '_blank' href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p class='park-description'>${responseJson.data[i].description}</p>
        </li>`);
    }

    $('.results').removeClass('hidden');
    $('.park-container').removeClass('hidden');
}

function getParks(baseUrl, stateArray, userResultsnum, apiKey) {
    // Setting up parameters for the state search
    const params = {
        stateCode: stateArray,
        limit: userResultsnum
    }
    // Creating url string to veiw in the console
    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);
   
    // Fetch state results, if there's an error display a message
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, userResultsnum))
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

// Watch search form for submit, call getParks
function watchUserForm() {
    $('.list-form').on('submit', function() {
        event.preventDefault();
        const baseUrl = 'https://api.nps.gov/api/v1/parks'
        const stateArray = $('#js-user-search').val().split(",");
        const userResultsnum = $('#js-user-results-num').val();
        // Insert your own NPS API key for the value of apiKey.
        const apiKey = 'hDoeeZ7apdh5CLqUvw666RjMerqx0fxT6xfnGErl';
        getParks(baseUrl, stateArray, userResultsnum, apiKey);
    })
}

watchUserForm();

setUpMap();
parkSearch();