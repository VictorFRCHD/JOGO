import { qs, on } from './utils.js';
import { t } from './i18n.js';

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function initAuth(onAuth) {
  let signup = false;
  const title = qs('#auth-title');
  const action = qs('#auth-action');
  const toggle = qs('#auth-toggle');
  const nameInput = qs('#auth-name');

  function render() {
    if (signup) {
      title.textContent = t('signup');
      action.textContent = t('signup');
      toggle.textContent = t('switch_to_login');
      nameInput.classList.remove('hidden');
    } else {
      title.textContent = t('login');
      action.textContent = t('login');
      toggle.textContent = t('switch_to_signup');
      nameInput.classList.add('hidden');
    }
  }

  on(action, 'click', () => {
    const email = qs('#auth-email').value;
    const pass = qs('#auth-pass').value;
    const name = nameInput.value;
    if (signup) {
      const users = getUsers();
      if (users.find(u => u.email === email)) return alert('Exists');
      users.push({ email, pass, name });
      saveUsers(users);
      signup = false;
      render();
    } else {
      const user = getUsers().find(u => u.email === email && u.pass === pass);
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        onAuth(user);
      } else alert('Invalid');
    }
  });

  on(toggle, 'click', () => { signup = !signup; render(); });
  render();
}

export function getCurrentUser() {
  const u = sessionStorage.getItem('user');
  return u ? JSON.parse(u) : null;
}

export function logout() {
  sessionStorage.removeItem('user');
}
