/*
 * Donation Step 2 Modal Logic
 * Manages the second step of the multi-step donation form (Billing Information).
 */

export class DonationStep2 {
  private overlay: HTMLElement | null;
  private nameInput: HTMLInputElement | null;
  private emailInput: HTMLInputElement | null;
  private nextBtn: HTMLElement | null;
  private backLink: HTMLElement | null;

  constructor() {
    this.overlay = document.getElementById('donationStep2');
    this.nameInput = document.getElementById('step2Name') as HTMLInputElement;
    this.emailInput = document.getElementById('step2Email') as HTMLInputElement;
    this.nextBtn = document.querySelector('#donationStep2 .step2-next-btn');
    this.backLink = document.querySelector('#donationStep2 .step2-back-link');

    this.attachListeners();
  }

  /**
   * Wire up events for the step2 form
   */
  private attachListeners(): void {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToStep3());
    }

    if (this.backLink) {
      this.backLink.addEventListener('click', () => this.goBackToStep1());
    }

    // click outside modal closes
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }
  }

  /**
   * Show the modal
   */
  public open(): void {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
    }
    this.resetForm();
  }

  /**
   * Hide the modal
   */
  public close(): void {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  /**
   * Reset all form fields to initial state
   */
  private resetForm(): void {
    if (this.nameInput) this.nameInput.value = '';
    if (this.emailInput) this.emailInput.value = '';
  }

  /**
   * Go back to Step 1
   */
  private goBackToStep1(): void {
    this.close();
    if ((window as any).donationStep1Instance) {
      (window as any).donationStep1Instance.open();
    }
  }

  /**
   * Validate and proceed to step 3
   */
  private goToStep3(): void {
    const name = this.nameInput?.value.trim() || '';
    const email = this.emailInput?.value.trim() || '';

    if (!name) {
      alert('Please enter your name.');
      return;
    }

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // close current overlay
    this.close();

    // dispatch event or store state
    const event = new CustomEvent('donationStep2Complete', {
      detail: {
        name,
        email,
      },
    });
    window.dispatchEvent(event);

    console.log('Proceeding to Step 3 with:', {
      name,
      email,
    });

    // Open Step 3 if available
    if ((window as any).donationStep3Instance) {
      (window as any).donationStep3Instance.open();
    }
  }
}

// instantiate once DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const step2 = new DonationStep2();
  (window as any).donationStep2Instance = step2;
});

