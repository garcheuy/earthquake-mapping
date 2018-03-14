var mapBox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
  "T6YbdDixkOBWH_k9GbS8JQ";

// Create a map object
var myMap = L.map("map", {
    center: [40.851824075995296, -116.39751334605495],
    zoom: 5
});

// Add a tile layer
L.tileLayer(mapBox).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    var earthquakes = L.geoJSON(earthquakeData);

    for (var i = 0; i < earthquakeData.length; i++) {
        L.circle(earthquakes[i], {
            fillOpacity: 0.75,
            radius: markerSize(earthquakeData[i].properties.mag)
        }).addTo(myMap);
    }

}

// Define a markerSize function that will give each earthquake a different radius based on its magnitude
function markerSize(magnitude) {
    return magnitude * 10;
}