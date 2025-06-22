import { qs, createEl, on } from './utils.js';
import { t } from './i18n.js';

function getMatches() {
  return JSON.parse(localStorage.getItem('matches') || '[]');
}
function saveMatches(ms) {
  localStorage.setItem('matches', JSON.stringify(ms));
}

export function renderDashboard(openChat, openReserve) {
  const container = qs('#dashboard');
  container.innerHTML = `<h2>${t('dashboard')}</h2><button id="new-match">${t('create_match')}</button><ul id="match-list"></ul>`;
  const list = qs('#match-list');
  const matches = getMatches();
  matches.forEach(m => list.append(matchItem(m)));
  on(qs('#new-match'), 'click', () => {
    const title = prompt(t('match_title'));
    const place = prompt(t('match_place'));
    const when = prompt(t('match_when'));
    if (title) {
      const m = { id: Date.now(), title, place, when, coords:[48.85,2.35] };
      matches.push(m);
      saveMatches(matches);
      list.append(matchItem(m));
    }
  });
}

function matchItem(m) {
  const li = createEl('li');
  li.textContent = `${m.title} - ${m.place} - ${m.when}`;
  const chatBtn = createEl('button',{textContent:t('chat')});
  const resBtn = createEl('button',{textContent:t('reserve')});
  li.append(' ', chatBtn, ' ', resBtn);
  on(chatBtn,'click',()=>window.JOGO.openChat(m.id));
  on(resBtn,'click',()=>window.JOGO.openReserve(m.id));
  return li;
}

export function getMatchById(id) {
  return getMatches().find(m => m.id===id);
}
