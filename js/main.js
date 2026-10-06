'use strict';

// Marks JS as available for CSS gates (e.g. the mobile full-screen nav).
document.documentElement.classList.add('js');

/**
 * Single source of truth for the web-app URL (arc42 §4.3):
 * Landing page → click Login → redirect to the app domain →
 * authentication at the Identity Provider.
 *
 * NOTE: Adjust once the app domain is finalized.
 */
const APP_URL = 'https://app.horarium.ch';

/**
 * SaaS self-service signup ("Registrieren") lives on the same app domain;
 * adjust the path once the registration route is finalized.
 */
const SIGNUP_URL = 'https://app.horarium.ch/register';

document.querySelectorAll('.js-login-link').forEach((link) => {
  link.setAttribute('href', APP_URL);
});

document.querySelectorAll('.js-signup-link').forEach((link) => {
  link.setAttribute('href', SIGNUP_URL);
});

const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

/**
 * Dropdown widgets (<details>-based, work without JS): language switcher,
 * products dropdown, mobile nav menu and their nested submenus. JS
 * enhancement: close on outside click and Escape; closing a menu also
 * closes its nested menus.
 */
function closeDetailsTree(root) {
  root.querySelectorAll('details[open]').forEach((nested) => {
    nested.open = false;
  });
  root.open = false;
}

document.querySelectorAll('.lang-switcher, .nav-switcher, .lang-sub, .product-switcher, .product-sub').forEach((switcher) => {
  document.addEventListener('click', (event) => {
    if (switcher.open && !switcher.contains(event.target)) {
      closeDetailsTree(switcher);
    }
  });

  switcher.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && switcher.open) {
      closeDetailsTree(switcher);
      switcher.querySelector('summary')?.focus();
    }
  });

  switcher.addEventListener('toggle', () => {
    if (!switcher.open) {
      switcher.querySelectorAll('details[open]').forEach((nested) => {
        nested.open = false;
      });
    }
  });
});

/**
 * Products mega-menu (desktop, HeyGen-style): opens on hover. On
 * hover-capable pointers a click just keeps it open (close by leaving
 * the toggle, Escape or an outside click); touch devices keep the
 * native <details> tap toggle.
 */
const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');

document.querySelectorAll('.product-switcher').forEach((switcher) => {
  const summary = switcher.querySelector('summary');
  if (!summary) {
    return;
  }

  switcher.addEventListener('pointerenter', () => {
    if (hoverCapable.matches) {
      switcher.open = true;
    }
  });

  switcher.addEventListener('pointerleave', () => {
    if (hoverCapable.matches) {
      switcher.open = false;
    }
  });

  summary.addEventListener('click', (event) => {
    if (hoverCapable.matches) {
      event.preventDefault();
      switcher.open = true;
    }
  });
});

/**
 * Mobile hamburger menu: with JS the panel is a fixed full-screen overlay
 * (html.js CSS gate). The header's backdrop-filter is lifted while the
 * panel is open (.nav-panel-open) and page scroll is locked, because a
 * backdrop-filter ancestor would otherwise be the containing block for
 * the fixed panel. Without JS the <details> markup falls back to a
 * dropdown panel below the toggle.
 */
const navSwitcher = document.querySelector('.nav-switcher');
if (navSwitcher) {
  const siteHeader = document.querySelector('.site-header');
  const mobileBreakpoint = window.matchMedia('(max-width: 40rem)');
  const syncNavPanel = () => {
    const open = navSwitcher.open && mobileBreakpoint.matches;
    document.body.classList.toggle('nav-locked', open);
    if (siteHeader) {
      siteHeader.classList.toggle('nav-panel-open', open);
    }
  };
  navSwitcher.addEventListener('toggle', syncNavPanel);
  if (typeof mobileBreakpoint.addEventListener === 'function') {
    mobileBreakpoint.addEventListener('change', syncNavPanel);
  }
  syncNavPanel();
}

/**
 * Preview notice (<dialog>): shown on every page until dismissed.
 * The `open` attribute in the markup keeps it visible without JS
 * (a <form method="dialog"> closes it natively); with JS it opens as a
 * modal and the dismissal is persisted in localStorage.
 */
const notice = document.getElementById('preview-notice');
if (notice) {
  const DISMISS_KEY = 'horaria-notice-dismissed';
  let dismissed = false;
  try {
    dismissed = localStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    /* storage unavailable — keep showing the notice */
  }
  notice.removeAttribute('open');
  if (!dismissed) {
    if (typeof notice.showModal === 'function') {
      notice.showModal();
    } else {
      notice.setAttribute('open', '');
    }
  }
  notice.addEventListener('close', () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* dismissal just is not persisted */
    }
  });
}
