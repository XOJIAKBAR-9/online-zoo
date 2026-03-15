/**
 * Donation Modal Component
 * Handles donation modal interactions and amount selection
 */

export class DonationModal {
  private modal: HTMLElement | null;
  private overlay: HTMLElement | null;
  private backdrop: HTMLElement | null;
  private closeBtn: HTMLElement | null;
  private donationButtons: NodeListOf<HTMLElement>;
  private customAmountSection: HTMLElement | null;
  private customAmountInput: HTMLInputElement | null;
  private customSubmitBtn: HTMLElement | null;
  private customCancelBtn: HTMLElement | null;
  private selectedAmount: number | string | null = null;

  constructor() {
    this.modal = document.querySelector('.modal-overlay');
    this.overlay = document.querySelector('.modal');
    this.backdrop = document.querySelector('.modal-backdrop');
    this.closeBtn = document.querySelector('.modal__close');
    this.donationButtons = document.querySelectorAll('.btn-donation');
    this.customAmountSection = document.querySelector('.custom-amount-section');
    this.customAmountInput = document.querySelector('.custom-amount-input') as HTMLInputElement;
    this.customSubmitBtn = document.querySelector('.btn-custom-submit');
    this.customCancelBtn = document.querySelector('.btn-custom-cancel');

    this.initialize();
  }

  /**
   * Initialize event listeners
   */
  private initialize(): void {
    this.attachEventListeners();
  }

  /**
   * Attach all event listeners
   */
  private attachEventListeners(): void {
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Backdrop click
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.closeModal());
    }

    // Donation amount buttons
    this.donationButtons.forEach((button) => {
      button.addEventListener('click', (e) => this.handleDonationClick(e));
    });

    // Custom amount buttons
    if (this.customSubmitBtn) {
      this.customSubmitBtn.addEventListener('click', () => this.handleCustomSubmit());
    }

    if (this.customCancelBtn) {
      this.customCancelBtn.addEventListener('click', () => this.hideCustomInput());
    }

    // Allow Enter key to submit custom amount
    if (this.customAmountInput) {
      this.customAmountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleCustomSubmit();
        }
      });
    }
  }

  /**
   * Handle preset donation amount button click
   */
  private handleDonationClick(event: Event): void {
    const button = event.target as HTMLElement;
    const amount = button.dataset.amount;

    if (amount === 'custom') {
      // directly open step1 form without selecting a preset amount
      this.proceedWithDonation('');
    } else if (amount) {
      this.selectedAmount = parseInt(amount, 10);
      this.proceedWithDonation(this.selectedAmount);
    }
  }

  /**
   * Show custom amount input section
   */
  private showCustomInput(): void {
    if (this.customAmountSection) {
      this.customAmountSection.style.display = 'block';
      if (this.customAmountInput) {
        this.customAmountInput.focus();
      }
    }
  }

  /**
   * Hide custom amount input section
   */
  private hideCustomInput(): void {
    if (this.customAmountSection) {
      this.customAmountSection.style.display = 'none';
    }
    if (this.customAmountInput) {
      this.customAmountInput.value = '';
    }
  }

  /**
   * Handle custom amount submission
   */
  private handleCustomSubmit(): void {
    if (!this.customAmountInput) return;

    const value = this.customAmountInput.value.trim();

    // Validate input
    if (!value) {
      alert('Please enter an amount');
      return;
    }

    const amount = parseFloat(value);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    if (amount < 1) {
      alert('Minimum donation amount is $1');
      return;
    }

    this.selectedAmount = amount;
    this.proceedWithDonation(amount);
  }

  /**
   * Proceed with donation - store amount and navigate to payment page
   */
  private proceedWithDonation(amount: number | string): void {
    // Store donation amount in sessionStorage
    sessionStorage.setItem('donationAmount', String(amount));

    console.log(`Donation selected: $${amount}`);

    // Navigate to the new donation step 1 page
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    let basePath = '/';
    
    if (currentPath.includes('/pages/')) {
      // We're on a subpage, need to go up two levels
      basePath = '../../';
    }
    
    window.location.href = basePath + 'pages/donation/donation_step/step1/index.html';
  }

  /**
   * Close the modal
   */
  private closeModal(): void {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
    if (this.backdrop) {
      this.backdrop.style.display = 'none';
    }
    // Reset state
    this.selectedAmount = null;
    this.hideCustomInput();
  }

  /**
   * Open the modal (public method for external calls)
   */
  public openModal(): void {
    if (this.modal) {
      this.modal.style.display = 'flex';
    }
    if (this.backdrop) {
      this.backdrop.style.display = 'block';
    }
    // Reset custom input
    this.hideCustomInput();
  }

  /**
   * Get selected donation amount
   */
  public getSelectedAmount(): number | string | null {
    return this.selectedAmount;
  }
}

// Initialize modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const donationModal = new DonationModal();

  // Make modal accessible globally for opening from navbar
  (window as any).donationModalInstance = donationModal;
});

