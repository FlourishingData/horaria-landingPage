'use strict';

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
 * Language switcher (<details>-based, works without JS).
 * JS enhancement: close on outside click and on Escape.
 */
document.querySelectorAll('.lang-switcher').forEach((switcher) => {
  document.addEventListener('click', (event) => {
    if (switcher.open && !switcher.contains(event.target)) {
      switcher.open = false;
    }
  });

  switcher.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && switcher.open) {
      switcher.open = false;
      switcher.querySelector('summary')?.focus();
    }
  });
});
