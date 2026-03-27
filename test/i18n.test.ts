import { LanguageManager } from '../src/components/i18n';
import translations from '../src/data/translations';

describe('LanguageManager', () => {
  beforeAll(() => {
    (global as any).MutationObserver = class {
      constructor() {}
      disconnect() {}
      observe() {}
    };
  });

  beforeEach(() => {
    document.documentElement.removeAttribute('lang');
    localStorage.clear();
    document.body.innerHTML = `
      <button id="lang-toggle-btn"><span id="lang-label"></span></button>
      <h1 data-i18n="nav.about"></h1>
      <input data-i18n-ph="ph.enterAmount" />
    `;
  });

  test('Initializes with en by default', () => {
    new LanguageManager();
    expect(document.documentElement.lang).toBe('en');
    expect(document.getElementById('lang-label')?.textContent).toBe('EN');
  });

  test('Cycling from EN to RU on first toggle', () => {
    new LanguageManager();
    document.getElementById('lang-toggle-btn')?.click();
    expect(document.documentElement.lang).toBe('ru');
    expect(document.getElementById('lang-label')?.textContent).toBe('RU');
  });

  test('Cycling from RU to UZ on second toggle', () => {
    new LanguageManager();
    document.getElementById('lang-toggle-btn')?.click(); // EN -> RU
    document.getElementById('lang-toggle-btn')?.click(); // RU -> UZ
    expect(document.documentElement.lang).toBe('uz');
    expect(document.getElementById('lang-label')?.textContent).toBe('UZ');
  });

  test('Automatically translates data-i18n text elements', () => {
    new LanguageManager();
    const h1 = document.querySelector('h1[data-i18n="nav.about"]') as HTMLElement;
    expect(h1.textContent).toBe('ABOUT');

    document.getElementById('lang-toggle-btn')?.click(); // -> RU
    expect(h1.textContent).toBe('О НАС');
  });

  test('Automatically translates data-i18n-ph placeholder elements', () => {
    new LanguageManager();
    const input = document.querySelector('input[data-i18n-ph="ph.enterAmount"]') as HTMLInputElement;
    expect(input.placeholder).toBe(translations['ph.enterAmount'].en);

    document.getElementById('lang-toggle-btn')?.click(); // -> RU
    expect(input.placeholder).toBe(translations['ph.enterAmount'].ru);
  });

  test('Persists language choice to localStorage properly', () => {
    new LanguageManager();
    document.getElementById('lang-toggle-btn')?.click(); // -> RU
    expect(localStorage.getItem('lang')).toBe('ru');

    document.body.innerHTML = '<button id="lang-toggle-btn"><span id="lang-label"></span></button>';
    new LanguageManager();
    expect(document.documentElement.lang).toBe('ru');
  });
});
