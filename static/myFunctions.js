
const getColor = (num) => {
  switch (true) {
    case num > 5:
      return "#d73027";
    case num > 4:
      return "#fc8d59";
    case num > 3:
      return "#fee08b";
    case num > 2:
      return "#d9ef8b";
    case num > 1:
      return "#91cf60";
    case num > 0:
      return "#1a9850";
    default:
      return "grey";
  }
};

// Layer Generator
const makeLayer = id => {
  return L.tileLayer ("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: id,
    accessToken: secrets.API_KEY
  })
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}