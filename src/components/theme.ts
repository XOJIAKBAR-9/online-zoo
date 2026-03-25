/**
 * ThemeManager – handles dark / light mode toggle with localStorage persistence.
 *
 * State management:
 *  • Reads the saved theme from localStorage("theme") on construction.
 *  • Applies the theme by setting `document.documentElement.dataset.theme`.
 *  • Swaps the toggle-button icon (🌙 ↔ ☀️).
 *  • Persists the choice to localStorage on every toggle.
 *  • Uses MutationObserver to bind the toggle button even when the header
 *    is loaded dynamically via fetch on sub-pages.
 */

type Theme = 'light' | 'dark';

export class ThemeManager {
  private static readonly STORAGE_KEY = 'theme';
  private currentTheme: Theme;

  constructor() {
    this.currentTheme = this.getSavedTheme();
    // Apply the theme immediately so there's no flash of wrong colours
    this.applyTheme(this.currentTheme);
    this.bindToggle();
    // Watch for the toggle button appearing later (dynamic header via fetch)
    this.observeForToggle();
  }

  /** Read previously saved theme, defaulting to 'light'. */
  private getSavedTheme(): Theme {
    const saved = localStorage.getItem(ThemeManager.STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /** Apply theme to the document and update the toggle icon. */
  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateIcon(theme);
  }

  /** Swap the icon inside the toggle button. */
  private updateIcon(theme: Theme): void {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  /** Wire up the toggle button click handler. */
  private bindToggle(): void {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn && !btn.dataset.bound) {
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => this.toggle());
    }
  }

  /**
   * Observe the DOM for the toggle button being added later.
   * This handles sub-pages that load the header via fetch().
   */
  private observeForToggle(): void {
    const observer = new MutationObserver(() => {
      const btn = document.getElementById('theme-toggle-btn');
      if (btn && !btn.dataset.bound) {
        this.bindToggle();
        this.updateIcon(this.currentTheme);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Safety: disconnect after 10 s to avoid leaks on pages without the button
    setTimeout(() => observer.disconnect(), 10000);
  }

  /** Toggle between dark and light and persist. */
  private toggle(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem(ThemeManager.STORAGE_KEY, this.currentTheme);
  }
}

// Self-initialise once the DOM is ready, but skip during Jest tests
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeManager());
  } else {
    new ThemeManager();
  }
}
