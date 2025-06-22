import { qs, createEl, on } from './utils.js';
import { t } from './i18n.js';

function getChats() {
  return JSON.parse(localStorage.getItem('chats') || '{}');
}
function saveChats(c) { localStorage.setItem('chats', JSON.stringify(c)); }

export function openChat(matchId) {
  const chats = getChats();
  const msgs = chats[matchId] || [];
  const modal = qs('#modal');
  modal.innerHTML = `<div class="modal"><div class="modal-content"><h3>${t('chat')}</h3><div id="chat-msgs" style="max-height:200px;overflow:auto"></div><input id="chat-input"><button id="chat-send">${t('send')}</button></div></div>`;
  modal.classList.remove('hidden');
  const list = qs('#chat-msgs');
  list.innerHTML = msgs.map(m=>`<div>${m}</div>`).join('');
  on(qs('#chat-send'),'click',()=>{
    const text = qs('#chat-input').value;
    if (text) { msgs.push(text); chats[matchId]=msgs; saveChats(chats); list.innerHTML += `<div>${text}</div>`; qs('#chat-input').value=''; }
  });
  on(modal,'click',e=>{ if(e.target===modal) modal.classList.add('hidden'); });
}
