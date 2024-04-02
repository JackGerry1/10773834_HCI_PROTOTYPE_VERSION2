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
*/

import customMapStyles from "./mapStyles.js";

// define the map and marker global variables
let map, marker;

// earthquake api variable
const earthquakeDataURL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

function initMap() {
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
        const userLocation = {
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
  // window to store earthquake information
  const infoWindow = new google.maps.InfoWindow({
    minWidth: 200,
    maxWidth: 200,
  });

  // Load USGS earthquake data for the last month >= 4.5 magnitude
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
    })
    .catch((error) => {
      console.error("Error fetching earthquake data:", error);
    });

  // return dynamically sized circle icons based on the magnitude of the earthquake and a different coloured circle based on depth
  map.data.setStyle((feature) => {
    const magnitude = feature.getProperty("mag");
    const depth = feature.getProperty("depth");
    return {
      icon: getCircle(magnitude, depth),
    };
  });

  // onclick display the window with the lat, lng, and magnitude of the earthquake
  map.data.addListener("click", (event) => {
    const magnitude = event.feature.getProperty("mag");
    const place = event.feature.getProperty("place");
    const depth = event.feature.getProperty("depth"); 
    const location = event.feature.getGeometry().get();
    const latitude = location.lat();
    const longitude = location.lng();

    // store the earthquake info so it can be rendered later
    const earthquakeInfo = {
      magnitude: magnitude,
      latitude: latitude,
      longitude: longitude,
      place: place,
      depth: depth,
    };

    // render the HTML for the earthquake information from the API
    const infoWindowContent = `
    <div class="info-window">
      <h3>Earthquake Information</h3>
      <p><span>Place:</span> ${earthquakeInfo.place}</p>
      <p><span>Latitude:</span> ${earthquakeInfo.latitude}</p>
      <p><span>Longitude:</span> ${earthquakeInfo.longitude}</p>
      <p><span>Magnitude:</span> ${earthquakeInfo.magnitude}</p>
      <p><span>Depth:</span> ${earthquakeInfo.depth}</p>      
    </div>
    `;

    // display the window and set its position to the position of the earthquake
    infoWindow.setContent(infoWindowContent);
    infoWindow.setPosition(location);
    infoWindow.open(map);
  });
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

// render the google map
window.initMap = initMap;
