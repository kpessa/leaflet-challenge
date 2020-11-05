let satellite = makeLayer("satellite-v9")
let streets = makeLayer("streets-v11")
let light = makeLayer("light-v10")
let dark = makeLayer("dark-v10")

let baseMaps = {
    Satellite: satellite,
    Streets: streets,
    Light: light,
    Dark: dark
}

d3.json(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
).then((data) => {
  var earthquakes = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      
        if (isNaN(feature.properties.mag || isNaN(latlng.lat)) || isNaN(latlng.lng)) {
          return null;
      } 
        var color = getColor(feature.properties.mag);
      


      return L.circleMarker(latlng, {
        radius: 5 * Math.pow(feature.properties.mag, 1.2),
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.6,
      });
    },
    onEachFeature: (feature, layer) => {
      let date = new Date(feature.properties.time);
      let date_formatted = date.toLocaleString();

      layer.bindPopup(`<h3 style="text-align:center;">M ${feature.properties.mag.toFixed(
        1
      )} ${capitalize(feature.properties.type)}</h3>
            <hr>
            <table>
              <tr>
                <td style="text-align:right; font-weight:bold;">When:</td>
                <td>${date_formatted}</td>
              </tr>
              <tr>
                <td style="text-align:right; font-weight:bold;">Location:</td>
                <td>${capitalize(feature.properties.place)}</td>
              </tr>
            </table>
            `);
    },
  });
  var overlayMaps = { Earthquakes: earthquakes };

  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (mymap) {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML += `<i style="background: #1a9850"></i>0-1<br>`;
    div.innerHTML += `<i style="background: #91cf60"></i>1-2<br>`;
    div.innerHTML += `<i style="background: #d9ef8b"></i>2-3<br>`;
    div.innerHTML += `<i style="background: #fee08b"></i>3-4<br>`;
    div.innerHTML += `<i style="background: #fc8d59"></i>4-5<br>`;
    div.innerHTML += `<i style="background: #d73027"></i>5+<br>`;
    return div;
  };

  // ---------------------------------------------

  var mymap = L.map("mapid", {
    layers: [light, earthquakes],
  }).setView([51.505, -80], 3);

  legend.addTo(mymap);

  L.control.layers(baseMaps, overlayMaps).addTo(mymap);
});





