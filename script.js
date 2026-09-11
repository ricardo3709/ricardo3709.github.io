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
// Keep the mailto link as a no-JavaScript fallback; a normal click copies it.
document.querySelectorAll('[data-copy-email]').forEach(link => {
  link.setAttribute('role', 'button');
  link.addEventListener('keydown', event => {
    if (event.key === ' ') {
      event.preventDefault();
      link.click();
    }
  });
  link.addEventListener('click', async event => {
    event.preventDefault();
    const email = link.getAttribute('href').replace(/^mailto:/, '');
    const copied = await copyText(email);
    showToast(copied ? 'Email address copied.' : 'Could not copy. Please select and copy the email address directly.');
  });
});
