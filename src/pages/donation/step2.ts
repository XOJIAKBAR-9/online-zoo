// Step 2 - Billing Information Component
class DonationStep2 {
  private nameInput: HTMLInputElement | null = null;
  private emailInput: HTMLInputElement | null = null;

  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  private initializeElements(): void {
    this.nameInput = document.getElementById('step2Name') as HTMLInputElement;
    this.emailInput = document.getElementById('step2Email') as HTMLInputElement;

    if (!this.nameInput || !this.emailInput) {
      console.error('Required input elements not found for Step 2');
    }
  }

  private attachEventListeners(): void {
    // Back button
    const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
    if (backBtn) {
      backBtn.addEventListener('click', () => this.goBack());
    }

    // Next button
    const nextBtn = document.getElementById('nextBtn2') as HTMLButtonElement;
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.proceed());
    }
  }

  private validateForm(): boolean {
    const name = this.nameInput?.value.trim() || '';
    const email = this.emailInput?.value.trim() || '';

    // Validate name
    if (!name) {
      alert('Please enter your name');
      this.nameInput?.focus();
      return false;
    }

    // Validate email
    if (!email) {
      alert('Please enter your email address');
      this.emailInput?.focus();
      return false;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      this.emailInput?.focus();
      return false;
    }

    return true;
  }

  private goBack(): void {
    // Go back to Step 1
    window.location.href = '../step1/index.html';
  }

  private proceed(): void {
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    // Store billing information in session storage
    sessionStorage.setItem('donationName', this.nameInput?.value || '');
    sessionStorage.setItem('donationEmail', this.emailInput?.value || '');

    // Redirect to Step 3
    window.location.href = '../step3/index.html';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new DonationStep2();
});
