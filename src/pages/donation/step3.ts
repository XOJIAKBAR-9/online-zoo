// Step 3 - Payment Information Component
class DonationStep3 {
  private cardNumberInput: HTMLInputElement | null = null;
  private cvvInput: HTMLInputElement | null = null;
  private expMonthSelect: HTMLSelectElement | null = null;
  private expYearSelect: HTMLSelectElement | null = null;

  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  private initializeElements(): void {
    this.cardNumberInput = document.getElementById('cardNumber') as HTMLInputElement;
    this.cvvInput = document.getElementById('cvvNumber') as HTMLInputElement;
    this.expMonthSelect = document.getElementById('expMonth') as HTMLSelectElement;
    this.expYearSelect = document.getElementById('expYear') as HTMLSelectElement;

    if (!this.cardNumberInput || !this.cvvInput || !this.expMonthSelect || !this.expYearSelect) {
      console.error('Required payment input elements not found for Step 3');
    }
  }

  private attachEventListeners(): void {
    // Format card number input (spaces every 4 digits)
    if (this.cardNumberInput) {
      this.cardNumberInput.addEventListener('input', (e) => this.formatCardNumber(e));
    }

    // CVV input - only numbers
    if (this.cvvInput) {
      this.cvvInput.addEventListener('input', (e) => this.formatCVV(e));
    }

    // Back button
    const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
    if (backBtn) {
      backBtn.addEventListener('click', () => this.goBack());
    }

    // Complete button
    const completeBtn = document.getElementById('completeBtn') as HTMLButtonElement;
    if (completeBtn) {
      completeBtn.addEventListener('click', () => this.completeDonation());
    }
  }

  private formatCardNumber(e: Event): void {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Limit to 16 digits
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    let formattedValue = '';

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }

    input.value = formattedValue.trim();
  }

  private formatCVV(e: Event): void {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/gi, '');
  }

  private validateForm(): boolean {
    const cardNumber = this.cardNumberInput?.value.replace(/\s+/g, '') || '';
    const cvv = this.cvvInput?.value || '';
    const expMonth = this.expMonthSelect?.value || '';
    const expYear = this.expYearSelect?.value || '';

    // Validate card number (should be exactly 16 digits)
    if (!cardNumber) {
      alert('Please enter your credit card number');
      this.cardNumberInput?.focus();
      return false;
    }

    if (cardNumber.length !== 16) {
      alert('Please enter a valid card number (16 digits)');
      this.cardNumberInput?.focus();
      return false;
    }

    // Validate CVV (should be 3-4 digits)
    if (!cvv) {
      alert('Please enter your CVV number');
      this.cvvInput?.focus();
      return false;
    }

    if (cvv.length < 3 || cvv.length > 4) {
      alert('CVV must be 3 or 4 digits');
      this.cvvInput?.focus();
      return false;
    }

    // Validate expiration date
    if (!expMonth) {
      alert('Please select expiration month');
      this.expMonthSelect?.focus();
      return false;
    }

    if (!expYear) {
      alert('Please select expiration year');
      this.expYearSelect?.focus();
      return false;
    }

    // Check if card is not expired
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const selectedYear = parseInt(expYear, 10);
    const selectedMonth = parseInt(expMonth, 10);

    if (selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
      alert('Your card has expired. Please enter a valid expiration date.');
      return false;
    }

    return true;
  }

  private goBack(): void {
    // Go back to Step 2
    window.location.href = '../step2/index.html';
  }

  private completeDonation(): void {
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    // Retrieve stored donation data
    const amount = sessionStorage.getItem('donationAmount');
    const name = sessionStorage.getItem('donationName');
    const email = sessionStorage.getItem('donationEmail');
    const pet = sessionStorage.getItem('donationPet');
    const recurring = sessionStorage.getItem('donationRecurring');

    // Prepare payment data
    const paymentData = {
      amount: amount,
      cardNumber: this.cardNumberInput?.value.slice(-4), // Only last 4 digits for security
      expMonth: this.expMonthSelect?.value,
      expYear: this.expYearSelect?.value,
      name: name,
      email: email,
      pet: pet,
      recurring: recurring === 'true',
    };

    console.log('Donation completed:', paymentData);

    // Store payment data in session storage
    sessionStorage.setItem('donationPaymentData', JSON.stringify(paymentData));

    // Show success message
    alert(
      `Thank you for your donation of $${amount}!\n\nA confirmation email will be sent to ${email}.`
    );

    // Clear session storage after successful donation
    sessionStorage.clear();

    // Redirect to home page or thank you page
    window.location.href = '/index.html';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new DonationStep3();
});
