/**
 * LanguageManager – handles EN/RU language toggle with localStorage persistence.
 *
 * How it works:
 *  • Reads the saved language from localStorage("lang") on construction.
 *  • Applies the language by querying all [data-i18n] and [data-i18n-ph] elements
 *    and setting their textContent / placeholder from the translations dictionary.
 *  • Uses a MutationObserver to re-apply translations when the header is
 *    loaded dynamically via fetch on sub-pages.
 *  • Sets document.documentElement.lang for accessibility.
 *  • Persists the choice to localStorage on every toggle.
 */

import translations, { type Lang } from '../data/translations.js';

export class LanguageManager {
  private static readonly STORAGE_KEY = 'lang';
  private currentLang: Lang;

  constructor() {
    this.currentLang = this.getSavedLang();
    document.documentElement.lang = this.currentLang;
    this.applyLanguage();
    this.bindToggle();
    this.observeForToggle();
  }

  /** Read previously saved language, defaulting to 'en'. */
  private getSavedLang(): Lang {
    const saved = localStorage.getItem(LanguageManager.STORAGE_KEY);
    if (saved === 'en' || saved === 'ru' || saved === 'uz') return saved;
    return 'en';
  }

  /** Apply translations to all [data-i18n] and [data-i18n-ph] elements. */
  private applyLanguage(): void {
    // Text content
    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && translations[key]) {
        const text = translations[key][this.currentLang];
        // Preserve inner HTML structure for elements with <br> etc.
        if (el.querySelector('br') || el.querySelector('span')) {
          el.innerHTML = text.replace(/\n/g, '<br>');
        } else {
          el.textContent = text;
        }
      }
    });

    // Placeholder attributes
    document.querySelectorAll<HTMLElement>('[data-i18n-ph]').forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      if (key && translations[key]) {
        (el as HTMLInputElement | HTMLTextAreaElement).placeholder = translations[key][this.currentLang];
      }
    });

    // Update toggle button label
    this.updateLabel();
  }

  /** Update the language toggle button text. */
  private updateLabel(): void {
    const label = document.getElementById('lang-label');
    if (label) {
      // Show the current language in uppercase
      label.textContent = this.currentLang.toUpperCase();
    }
  }

  /** Wire up the toggle button click handler. */
  private bindToggle(): void {
    const btn = document.getElementById('lang-toggle-btn');
    if (btn && !btn.dataset.langBound) {
      btn.dataset.langBound = 'true';
      btn.addEventListener('click', () => this.toggle());
    }
  }

  /**
   * Observe the DOM for the toggle button being added later.
   * Handles sub-pages that load the header via fetch().
   */
  private observeForToggle(): void {
    const observer = new MutationObserver(() => {
      const btn = document.getElementById('lang-toggle-btn');
      if (btn && !btn.dataset.langBound) {
        this.bindToggle();
        this.applyLanguage(); // Re-apply to newly added elements
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }

  /** Toggle between EN, RU, and UZ and persist. */
  private toggle(): void {
    const langSwitch: Record<Lang, Lang> = {
      'en': 'ru',
      'ru': 'uz',
      'uz': 'en'
    };
    this.currentLang = langSwitch[this.currentLang];
    document.documentElement.lang = this.currentLang;
    localStorage.setItem(LanguageManager.STORAGE_KEY, this.currentLang);
    this.applyLanguage();
  }
}

// Self-initialise once the DOM is ready, but skip during Jest tests
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LanguageManager());
  } else {
    new LanguageManager();
  }
}
