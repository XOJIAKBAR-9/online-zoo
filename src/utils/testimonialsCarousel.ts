// Testimonials Carousel Handler with Infinite Looping - Show 4 Cards
class TestimonialsCarousel {
  private container: HTMLElement | null = null;
  private prevBtn: HTMLElement | null = null;
  private nextBtn: HTMLElement | null = null;
  private cards: HTMLElement[] = [];
  private currentIndex: number = 0;
  private cardsPerView: number = 4;

  constructor() {
    this.initializeCarousel();
  }

  private initializeCarousel(): void {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupCarousel();
      });
    } else {
      this.setupCarousel();
    }
  }

  private setupCarousel(): void {
    this.container = document.querySelector('.testimonials-grid') as HTMLElement;
    this.prevBtn = document.querySelector('.testimonials-section .carousel-controls .prev');
    this.nextBtn = document.querySelector('.testimonials-section .carousel-controls .next');

    if (!this.container || !this.prevBtn || !this.nextBtn) {
      return;
    }

    this.cards = Array.from(this.container.querySelectorAll('.testimonial-card')) as HTMLElement[];

    if (this.cards.length === 0) {
      return;
    }

    // Determine cards per view based on screen size
    this.updateCardsPerView();
    window.addEventListener('resize', () => this.updateCardsPerView());

    // Attach event listeners
    this.attachEventListeners();

    // Update carousel display
    this.updateCarousel();
  }

  private updateCardsPerView(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.cardsPerView = 1;
    } else if (width < 1024) {
      this.cardsPerView = 2;
    } else {
      this.cardsPerView = 4; // Show 4 cards at a time for testimonials
    }
  }

  private attachEventListeners(): void {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }

  private nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    this.updateCarousel();
  }

  private previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.updateCarousel();
  }

  private updateCarousel(): void {
    if (!this.container) return;

    // Hide all cards first
    this.cards.forEach((card) => {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transition = 'opacity 0.3s ease-in-out';
    });

    // Show current cards (4 at a time) with smooth transition
    for (let i = 0; i < this.cardsPerView; i++) {
      const cardIndex = (this.currentIndex + i) % this.cards.length;
      const card = this.cards[cardIndex];
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
      }, 10);
    }
  }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsCarousel();
  });
} else {
  new TestimonialsCarousel();
}
