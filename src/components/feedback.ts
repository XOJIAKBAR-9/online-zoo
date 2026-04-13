import translations, { Lang } from '../data/translations.js';

export class FeedbackModal {
  private overlay: HTMLElement | null = null;
  private isLoaded = false;

  constructor() {
    this.bindActivator();
  }

  /** Binds to the LEAVE FEEDBACK button on the page. */
  private bindActivator(): void {
    const btn = document.querySelector('.btn-feedback');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }
  }

  /** Opens the modal, fetching the HTML template if needed. */
  public async open(): Promise<void> {
    if (!this.isLoaded) {
      await this.loadModalTemplate();
    }
    this.overlay?.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent page scrolling
  }

  /** Closes the modal. */
  public close(): void {
    this.overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  /** Dynamically loads the HTML template into the DOM */
  private async loadModalTemplate(): Promise<void> {
    try {
      const basePath = window.location.pathname.includes('/pages/') 
        ? '../../pages/' 
        : './pages/';
      const res = await fetch(`${basePath}components/feedback/feedbackModal.html`);
      if (!res.ok) throw new Error('Could not fetch feedbackModal.html');
      
      const html = await res.text();
      // Insert modal directly into body
      document.body.insertAdjacentHTML('beforeend', html);
      
      this.overlay = document.getElementById('feedbackOverlay');
      this.bindModalEvents();
      this.applyTranslations();
      this.isLoaded = true;
      
    } catch (err) {
      console.error('FeedbackModal load error:', err);
    }
  }

  private applyTranslations(): void {
    const currentLang = (document.documentElement.lang || 'en') as Lang;
    
    // Text content
    this.overlay?.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && translations[key]) {
        el.textContent = translations[key][currentLang];
      }
    });

    // Placeholders
    this.overlay?.querySelectorAll<HTMLElement>('[data-i18n-ph]').forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      if (key && translations[key]) {
        (el as HTMLInputElement | HTMLTextAreaElement).placeholder = translations[key][currentLang];
      }
    });
  }
 
  /** Binds the close and submit events inside the modal. */
  private bindModalEvents(): void {
    const closeBtn = document.getElementById('feedbackClose');
    const form = document.getElementById('feedbackForm') as HTMLFormElement;

    closeBtn?.addEventListener('click', () => this.close());
    
    // Close when clicking empty space in overlay
    this.overlay?.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      // Logic for submit
      alert('Thank you for your feedback!');
      form.reset();
      this.close();
    });
  }
}

// Instantiate on DOM load across the board
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FeedbackModal());
  } else {
    new FeedbackModal();
  }
}
