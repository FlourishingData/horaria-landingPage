'use strict';

/**
 * Single source of truth for the web-app URL (arc42 §4.3):
 * Landing page → click Login → redirect to the app domain →
 * authentication at the Identity Provider.
 *
 * NOTE: Adjust once the app domain is finalized.
 */
const APP_URL = 'https://app.horaria.ch';

document.querySelectorAll('.js-login-link').forEach((link) => {
  link.setAttribute('href', APP_URL);
});

const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
