/*
References:
- Google (2024a). Geolocation: Displaying User or Device Position on Maps | Maps JavaScript API. [online] 
  Google. Available at: https://developers.google.com/maps/documentation/javascript/geolocation#maps_map_geolocation-javascript [Accessed 31 Jan. 2024].

- Google (2024b). Restricting Map Bounds | Maps JavaScript API. [online] 
  Google. Available at: https://developers.google.com/maps/documentation/javascript/examples/control-bounds-restriction [Accessed 13 Feb. 2024].

- Google (2024c). Visualizing Data: Mapping Earthquakes | Maps JavaScript API. [online] 
  Google. Available at: https://developers.google.com/maps/documentation/javascript/earthquakes [Accessed 5 Feb. 2024].

- Vieira, S. (2021). How To Use the JavaScript Fetch API to Get Data | DigitalOcean. [online] 
  www.digitalocean.com. Available at: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data [Accessed 14 Feb. 2024].

https://www.folio3.com/mobile/blog/what-is-google-maps-geometry-library-how-it-works/ access april 3rd 2024 
  */

import customMapStyles from "./mapStyles.js";

// Define the map and marker global variables
let map, marker, userLocation, distance;
// Function to initialize the map
function initMap() {
  google.maps.importLibrary("geometry");

  // Define the bounds for the map to restrict the view
  const bounds = {
    north: 85, // Maximum latitude
    south: -85, // Minimum latitude
    west: -180, // Maximum longitude
    east: 180, // Minimum longitude
  };

  // create a new google maps applying dark theme styling and disabling the defaultGoogle UI, like the yellow man
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    minZoom: 3,
    center: { lat: 0, lng: 0 },
    disableDefaultUI: true,
    styles: customMapStyles,
    restriction: {
      latLngBounds: bounds,
      strictBounds: false,
    },
  });

  // Try to get the user's current location by lat and lng
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Create a marker at the user's location if the user accepted their location being used
        marker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location",
        });

        // Center the map on the user's location
        map.setCenter(userLocation);
      },
      (error) => {
        console.error("Error getting user's location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

  // onclick display the window with the lat, lng, magnitude, and distance of the earthquake
  map.data.addListener("click", (event) => {
    const magnitude = event.feature.getProperty("mag");
    const place = event.feature.getProperty("place");
    const depth = event.feature.getProperty("depth");
    const time = event.feature.getProperty("time");
    const location = event.feature.getGeometry().get();
    const latitude = location.lat();
    const longitude = location.lng();

    if (userLocation) {
      // Extract latitude and longitude from userLocation
      const userLatlng = new google.maps.LatLng(
        userLocation.lat,
        userLocation.lng
      );

      // Extract latitude and longitude from earthquake location
      const earthquakeLatlng = new google.maps.LatLng(latitude, longitude);

      // Calculate the distance between the user's location and the earthquake location
      distance = google.maps.geometry.spherical.computeDistanceBetween(
        userLatlng,
        earthquakeLatlng
      );

      // Rest of your code inside the if block
    }

    // Convert distance to kilometers and round to 2 decimal places
    const distanceKm = (distance / 1000).toFixed(2);

    // Convert timestamp to Date object
    const date = new Date(parseInt(time));

    // Format date and time
    const formattedTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    // Check if distanceKm is NaN
    let distanceMessage;
    if (isNaN(distanceKm)) {
      distanceMessage =
        "Enable current location to calculate distance from earthquake";
    } else {
      distanceMessage = `${distanceKm}KM`;
    }

    // Render the HTML for the earthquake information from the API
    const infoWindowContent = `
    <div class="info-window">
      <h3>Earthquake Information</h3>
      <p><span>Place:</span> ${place}</p>
      <p><span>Latitude:</span> ${latitude}</p>
      <p><span>Longitude:</span> ${longitude}</p>
      <p><span>Magnitude:</span> ${magnitude}</p>
      <p><span>Depth:</span> ${depth}KM</p>
      <p><span>Time Of Earthquake:</span> ${formattedTime}</p>
      <p><span>Distance from Your Location:</span> ${distanceMessage}</p>
    </div>
    `;

    // Display the window and set its position to the position of the earthquake
    infoWindow.setContent(infoWindowContent);
    infoWindow.setPosition(location);
    infoWindow.open(map);
  });

  // window to store earthquake information
  const infoWindow = new google.maps.InfoWindow({
    minWidth: 200,
    maxWidth: 200,
  });

  // Load USGS earthquake data for the last month >= 4.5 magnitude by default
  loadEarthquakeData();
}

// create a red circle with size based on the magnitude of the earthquake
function getCircle(magnitude, depth) {
  let fillColor;

  // change colour of circles based on depth values
  if (depth <= 70) {
    fillColor = "red"; // 0-70km
  } else if (depth <= 300) {
    fillColor = "orange"; // 71-300km
  } else if (depth <= 500) {
    fillColor = "yellow"; // 301-500km
  } else if (depth <= 700) {
    fillColor = "purple"; // 501-700km
  } else {
    fillColor = "blue"; // 701-800km
  }

  // render the circles representing the earthquakes
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: fillColor,
    fillOpacity: 0.2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: "white",
    strokeWeight: 0.5,
  };
}

// Function to load earthquake data based on the selected radio button
function loadEarthquakeData() {
  // Define the earthquake API base URL
  const earthquakeAPIBaseURL =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";

  // Get the selected radio button value
  const selectedRadio = document.querySelector(
    'input[name="earthquakeType"]:checked'
  ).value;

  // Construct the full URL based on the selected radio button value
  const earthquakeDataURL = earthquakeAPIBaseURL + selectedRadio;

  // Clear existing earthquake data on the map
  map.data.forEach(function (feature) {
    map.data.remove(feature);
  });

  // Fetch earthquake data based on the selected URL
  fetch(earthquakeDataURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Modify GeoJSON data to include depth information in properties
      data.features.forEach((feature) => {
        const depth = feature.geometry.coordinates[2];
        feature.properties.depth = depth;
      });

      // Load modified GeoJSON data onto the map
      map.data.addGeoJson(data);

      // Set map data style after loading GeoJSON data
      map.data.setStyle((feature) => {
        const magnitude = feature.getProperty("mag");
        const depth = feature.getProperty("depth");
        return {
          icon: getCircle(magnitude, depth),
        };
      });
    })
    .catch((error) => {
      console.error("Error fetching earthquake data:", error);
    });
}

// Add event listeners to radio buttons for earthquake data selection
document.querySelectorAll('input[name="earthquakeType"]').forEach((radio) => {
  radio.addEventListener("change", loadEarthquakeData);
});

// render the google map
window.initMap = initMap;
