'use strict';

// The complete publication list remains readable when JavaScript is unavailable.
const filter = document.querySelector('.tag-filter');
const publications = [...document.querySelectorAll('.publication')];
if (filter) {
  filter.hidden = false;
  filter.querySelectorAll('[data-tag]').forEach(button => {
    const count = publications.filter(paper => button.dataset.tag === 'all' || paper.dataset.tags.split(',').includes(button.dataset.tag)).length;
    button.querySelector('.tag-count').textContent = count;
  });
  filter.addEventListener('click', event => {
    const selected = event.target.closest('button[data-tag]');
    if (!selected) return;
    const tag = selected.dataset.tag;
    filter.querySelectorAll('button').forEach(button => {
      const active = button === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    publications.forEach(paper => {
      paper.hidden = tag !== 'all' && !paper.dataset.tags.split(',').includes(tag);
      if (!paper.hidden) count += 1;
    });
    document.getElementById('filter-status').textContent = `Showing ${count} ${count === 1 ? 'publication' : 'publications'}.`;
  });
}

const copyValues = {
  email: 'xinyu.wang@sydney.edu.au',
  bio: 'Xinyu Wang is a Ph.D. researcher in Transportation Engineering at the University of Sydney, working with Dr. Andres Fielbaum and Prof. David Levinson in TransportLab. Xinyu’s research combines AI, operations research, and city-scale simulation to improve on-demand mobility and sustainable transport.'
};
let toastTimer;
function showToast(message) {
  const toast = document.querySelector('.toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(value); return true; } catch (_) { /* Try the local-file fallback below. */ }
  }
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;left:-9999px;top:0;';
  document.body.append(field);
  const previousFocus = document.activeElement;
  field.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
  field.remove();
  if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
  return copied;
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const copied = await copyText(copyValues[button.dataset.copy]);
    showToast(copied ? (button.dataset.copy === 'email' ? 'Email address copied.' : 'Short bio copied.') : 'Could not copy. Please select and copy the text directly.');
  });
});
