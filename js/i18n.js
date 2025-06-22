import { qs } from './utils.js';

const LOCALES = ['en', 'fr'];
let current = localStorage.getItem('lang') || 'en';
let dict = {};

export const t = key => dict[key] || key;

export async function load(lang) {
  if (!LOCALES.includes(lang)) lang = 'en';
  dict = await fetch(`i18n/${lang}.json`).then(r => r.json());
  current = lang;
  localStorage.setItem('lang', lang);
  renderTexts();
}

function renderTexts() {
  qs('#auth-action').textContent = t('login');
  qs('#auth-toggle').textContent = t('switch_to_signup');
  qs('nav button[data-page="dashboard"]').textContent = t('dashboard');
  qs('nav button[data-page="map"]').textContent = t('map');
  qs('nav button[data-page="leagues"]').textContent = t('leagues');
  qs('nav button[data-page="profile"]').textContent = t('profile');
  qs('#lang-switch').innerHTML = `${t('language')}: <select id="lang-select">${LOCALES.map(l=>`<option value="${l}" ${l===current?'selected':''}>${l.toUpperCase()}</option>`).join('')}</select>`;
  qs('#auth-title').textContent = t('login');
}

onload = () => {
  load(current);
  document.addEventListener('change', e => {
    if (e.target.id === 'lang-select') load(e.target.value);
  });
};
