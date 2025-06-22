import { qs, on } from './utils.js';
import { t } from './i18n.js';
import { getCurrentUser, logout } from './auth.js';

export function renderProfile(onLogout) {
  const user = getCurrentUser();
  const container = qs('#profile');
  container.innerHTML = `<h2>${t('profile')}</h2>
    <label>${t('name')} <input id="prof-name" value="${user.name}"></label>
    <label>${t('email')} <input id="prof-email" value="${user.email}"></label>
    <button id="save-prof">${t('save')}</button>
    <button id="logout">${t('logout')}</button>`;
  on(qs('#save-prof'),'click',()=>{
    user.name = qs('#prof-name').value;
    user.email = qs('#prof-email').value;
    sessionStorage.setItem('user', JSON.stringify(user));
    alert('saved');
  });
  on(qs('#logout'),'click',()=>{ logout(); onLogout(); });
}
