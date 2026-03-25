import translations from '../src/data/translations';

describe('Translations Data', () => {
  test('Dictionary has no missing or empty English strings', () => {
    Object.keys(translations).forEach((key) => {
      const entry = translations[key];
      expect(entry.en).toBeDefined();
      expect(entry.en.trim().length).toBeGreaterThan(0);
    });
  });

  test('Dictionary has no missing or empty Russian strings', () => {
    Object.keys(translations).forEach((key) => {
      const entry = translations[key];
      expect(entry.ru).toBeDefined();
      expect(entry.ru.trim().length).toBeGreaterThan(0);
    });
  });

  test('Dictionary has no missing or empty Uzbek strings', () => {
    Object.keys(translations).forEach((key) => {
      const entry = translations[key];
      expect(entry.uz).toBeDefined();
      expect(entry.uz.trim().length).toBeGreaterThan(0);
    });
  });

  test('Dictionary contains well-known structural keys', () => {
    expect(translations['nav.about']).toBeDefined();
    expect(translations['hero.title']).toBeDefined();
    expect(translations['footer.contact']).toBeDefined();
    expect(translations['modal.title']).toBeDefined();
  });
});
