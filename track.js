let firstTime = true;
if (firstTime) {
    var map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
}
var issico = L.icon({
    iconUrl: 'iss.png',
    iconSize: [40, 25],
    iconAnchor: [25, 16]
});
const iss = L.marker([0, 0], { icon: issico }).addTo(map);
var sunico = L.icon({
    iconUrl: 'sun.png',
    iconSize: [40, 40],
    iconAnchor: [25, 16]
});
const sun = L.marker([0, 0], { icon: sunico }).addTo(map);



const api_url = "https://api.wheretheiss.at/v1/satellites/25544"
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const {
        latitude,
        longitude,
        altitude,
        velocity,
        visibility,
        solar_lat,
        solar_lon
    } = data;
    document.getElementById('lat').textContent = latitude.toFixed(3);
    document.getElementById('lon').textContent = longitude.toFixed(3);
    document.getElementById('alti').textContent = altitude.toFixed(2);
    document.getElementById('velocity').textContent = velocity.toFixed(2);
    document.getElementById('visi').textContent = visibility;

    iss.setLatLng([latitude, longitude]);
    sun.setLatLng([solar_lat, solar_lon]);
    if (firstTime) {
        map.setView([latitude, longitude], 3);
        firstTime = false;
    }

}

getISS();

setInterval(getISS, 5000)



let header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let value = window.scrollY;
    header.style.top = value * 0.5 + 'px';
})