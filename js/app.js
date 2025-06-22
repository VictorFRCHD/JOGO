import { qs, qsa, on } from './utils.js';
import { initAuth, getCurrentUser } from './auth.js';
import { renderDashboard, getMatchById } from './dashboard.js';
import { renderMap } from './map.js';
import { renderLeagues } from './leagues.js';
import { renderProfile } from './profile.js';
import { openChat } from './chat.js';
import { openReserve } from './reservation.js';
import { registerSW } from './pwa.js';
import './i18n.js';

window.JOGO = { openChat, openReserve };

function showPage(id) {
  qsa('.page').forEach(p => p.classList.add('hidden'));
  qs('#'+id).classList.remove('hidden');
  if (id==='map-page') renderMap();
  if (id==='dashboard') renderDashboard(openChat, openReserve);
  if (id==='leagues') renderLeagues();
  if (id==='profile') renderProfile(()=>location.reload());
}

function initApp() {
  qs('#auth').classList.add('hidden');
  qs('#app').classList.remove('hidden');
  renderDashboard(openChat, openReserve);
  qsa('nav button').forEach(btn => on(btn,'click',()=>showPage(btn.dataset.page)));
  registerSW();
}

const user = getCurrentUser();
if (user) initApp();
else initAuth(initApp);
