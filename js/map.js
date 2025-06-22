import { qs } from './utils.js';
import { getMatchById } from './dashboard.js';
let map;
export function renderMap() {
  if (!map) {
    map = L.map('map').setView([48.85, 2.35], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);
  }
  L.layerGroup().addTo(map);
  const matches = JSON.parse(localStorage.getItem('matches') || '[]');
  matches.forEach(m => {
    L.marker(m.coords).addTo(map).bindPopup(m.title);
  });
}
