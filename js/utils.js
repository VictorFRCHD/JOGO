export const qs = s => document.querySelector(s);
export const qsa = s => Array.from(document.querySelectorAll(s));
export const on = (el, ev, fn) => el.addEventListener(ev, fn);
export const createEl = (tag, attrs = {}) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => el[k] = v);
  return el;
};
