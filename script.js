'use strict';

// Interface text follows the page language; the Chinese pages under zh/ set lang="zh-CN".
const text = document.documentElement.lang.startsWith('zh') ? {
  openMenu: '打开菜单',
  closeMenu: '关闭菜单',
  showing: count => `显示 ${count} 篇论文。`,
  copyLabel: email => `复制邮箱地址：${email}`,
  copyTitle: '点击复制邮箱地址',
  copied: email => `邮箱地址已复制：${email}`,
  copyFailed: email => `无法复制。我的邮箱地址是 ${email}`,
  emailIs: email => `我的邮箱地址是 ${email}`,
} : {
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  showing: count => `Showing ${count} ${count === 1 ? 'publication' : 'publications'}.`,
  copyLabel: email => `Copy email address: ${email}`,
  copyTitle: 'Click to copy email address',
  copied: email => `Email address copied: ${email}`,
  copyFailed: email => `Could not copy. My email address is ${email}`,
  emailIs: email => `My email address is ${email}`,
};

// Small-screen menu: the links stay visible as a wrapped row when JavaScript is unavailable.
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
if (header && navToggle) {
  const setMenu = open => {
    header.classList.toggle('nav-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? text.closeMenu : text.openMenu);
  };
  navToggle.addEventListener('click', () => setMenu(!header.classList.contains('nav-open')));
  header.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  // The open menu covers the page, so it closes when focus leaves the header or the layout widens.
  header.addEventListener('focusout', event => {
    if (header.classList.contains('nav-open') && event.relatedTarget && !header.contains(event.relatedTarget)) setMenu(false);
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('nav-open')) {
      setMenu(false);
      navToggle.focus();
    }
  });
}

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
    document.getElementById('filter-status').textContent = text.showing(count);
  });
}

let toastTimer;
function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    toast.textContent = '';
  }, 4500);
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
  link.setAttribute('aria-label', text.copyLabel(link.textContent.trim()));
  link.title = text.copyTitle;
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
    showToast(copied ? text.copied(email) : text.copyFailed(email));
  });
});
// Email buttons still open the mail app, and also copy the address in case no mail app is set up.
document.querySelectorAll('a[href^="mailto:"]:not([data-copy-email])').forEach(link => {
  link.addEventListener('click', async () => {
    const email = link.getAttribute('href').replace(/^mailto:/, '');
    const copied = await copyText(email);
    showToast(copied ? text.copied(email) : text.emailIs(email));
  });
});

// Both language versions share section ids, so switching language opens the other version at the section in view.
document.querySelectorAll('.lang-switch a').forEach(link => {
  link.addEventListener('click', () => {
    const inView = [...document.querySelectorAll('main section[id]:not(#top)')].filter(section => section.getBoundingClientRect().top <= innerHeight * 0.4).pop();
    link.hash = inView ? inView.id : '';
  });
});
