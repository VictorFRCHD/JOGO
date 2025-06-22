import { qs, createEl, on } from './utils.js';
import { t } from './i18n.js';

function getLeagues() {
  return JSON.parse(localStorage.getItem('leagues') || '[]');
}
function saveLeagues(ls) {
  localStorage.setItem('leagues', JSON.stringify(ls));
}

export function renderLeagues() {
  const container = qs('#leagues');
  container.innerHTML = `<h2>${t('leagues')}</h2><button id="new-league">${t('create_league')}</button><ul id="league-list"></ul>`;
  const list = qs('#league-list');
  const leagues = getLeagues();
  leagues.forEach(l => list.append(createEl('li',{textContent:l.name})));
  on(qs('#new-league'),'click',()=>{
    const name = prompt(t('name'));
    if (name) { const l = {id:Date.now(), name}; leagues.push(l); saveLeagues(leagues); list.append(createEl('li',{textContent:name})); }
  });
}
