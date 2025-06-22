import { qs, on } from './utils.js';
import { t } from './i18n.js';

function getRes() { return JSON.parse(localStorage.getItem('reservations')||'{}'); }
function saveRes(r) { localStorage.setItem('reservations', JSON.stringify(r)); }

export function openReserve(matchId) {
  const res = getRes();
  const modal = qs('#modal');
  modal.innerHTML = `<div class="modal"><div class="modal-content"><p>${t('reserve')}?</p><button id="ok-res">OK</button></div></div>`;
  modal.classList.remove('hidden');
  on(qs('#ok-res'),'click',()=>{
    res[matchId] = true; saveRes(res); modal.classList.add('hidden');
  });
  on(modal,'click',e=>{ if(e.target===modal) modal.classList.add('hidden'); });
}
