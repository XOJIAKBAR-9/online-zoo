import { ThemeManager } from '../src/components/theme';

describe('ThemeManager', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
    document.body.innerHTML = '<button id="theme-toggle-btn"><span id="theme-icon"></span></button>';
  });

  test('Initializes with default light theme if localStorage is empty', () => {
    new ThemeManager();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.getElementById('theme-icon')?.textContent).toBe('🌙');
  });

  test('Applies data-theme="dark" when toggled', () => {
    new ThemeManager();
    const btn = document.getElementById('theme-toggle-btn');
    btn?.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.getElementById('theme-icon')?.textContent).toBe('☀️');
  });

  test('Saves dark preference to localStorage', () => {
    new ThemeManager();
    document.getElementById('theme-toggle-btn')?.click();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('Properly loads user saved theme upon instantiation', () => {
    localStorage.setItem('theme', 'dark');
    new ThemeManager();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
