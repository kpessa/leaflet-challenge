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

// --------------------------------------------

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").then(data => {

    var earthquakes = L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
            let date = new Date(feature.properties.time)
            let date_formatted = date.toLocaleString()

            L.circle([feature.geometry.coordinates[0],
                feature.geometry.coordinates[1]], {
                    fillOpacity:0.75,
                    color: "red",
                    radius: feature.properties.mag * 10
                })
            
            layer.bindPopup(`<h3 style="text-align:center;">M ${feature.properties.mag.toFixed(1)} ${capitalize(feature.properties.type)}</h3>
            <hr>
            <table>
              <tr>
                <td style="text-align:right; font-weight:bold;">When:</td>
                <td>${date_formatted}</td>
              </tr>
              <tr>
                <td style="text-align:right; font-weight:bold;">Location:</td>
                <td>${feature.properties.place}</td>
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





