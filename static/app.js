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


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then(data => {

    var earthquakes = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            
            var color = 'grey';
            switch (true) {
                case feature.properties.mag > 5: color = 'red'; break;
                case feature.properties.mag > 4: color = 'orange'; break;
                case feature.properties.mag > 3: color = 'yellow'; break;
                case feature.properties.mag > 2: color = 'lightgrey'; break;
            }
            
            return L.circleMarker(latlng, {
                radius: Math.pow(feature.properties.mag,2),
                fillColor: color,
                color: color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.4
            });
        },
        onEachFeature: (feature, layer) => {
            let date = new Date(feature.properties.time)
            let date_formatted = date.toLocaleString()
            
            layer.bindPopup(`<h3 style="text-align:center;">M ${feature.properties.mag.toFixed(1)} ${capitalize(feature.properties.type)}</h3>
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
            `)
        }
    })
    var overlayMaps = { Earthquakes: earthquakes };

    // ---------------------------------------------

    var mymap = L.map('mapid',{
        layers: [light, earthquakes]
    }).setView([51.505, -80], 3);

    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
})





