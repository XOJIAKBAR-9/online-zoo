// Step 1 - Donation Amount Selection Component
import { getPets } from '../../services/apiService.js';
import { Pet } from '../../interfaces/types.js';

class DonationStep1 {
  private selectedAmount: number | null = null;
  private selectedPet: string | null = null;
  private isRecurring: boolean = false;

  constructor() {
    this.initializeElements();
    this.attachEventListeners();
    this.loadPets();
  }

  private initializeElements(): void {
    // Get form elements
    const amountGrid = document.getElementById('amountGrid') as HTMLElement;
    const otherAmountBtn = document.getElementById('step1OtherBtn') as HTMLButtonElement;
    const otherAmountInput = document.getElementById('otherAmount') as HTMLInputElement;
    const petSelect = document.getElementById('petSelect') as HTMLSelectElement;
    const recurringCheckbox = document.getElementById('recurringGift') as HTMLInputElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

    if (!amountGrid || !nextBtn) {
      console.error('Required elements not found for Step 1');
      return;
    }
  }

  private async loadPets(): Promise<void> {
    const petSelect = document.getElementById('petSelect') as HTMLSelectElement;
    if (!petSelect) return;

    try {
      const pets = await getPets();
      // Clear existing options except the first placeholder
      while (petSelect.options.length > 1) {
        petSelect.remove(1);
      }
      
      // Populate select with pets from API
    //   @ts-ignore
      pets.data.forEach((pet: Pet) => {
        const option = document.createElement('option');
        option.value = pet.id.toString();
        option.textContent = pet.commonName || pet.name;
        petSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading pets:', error);
    }
  }

  private attachEventListeners(): void {
    // Amount button clicks
    const amountButtons = document.querySelectorAll('.btn-amount');
    amountButtons.forEach((btn) => {
      btn.addEventListener('click', (e: Event) => this.selectAmount(e));
    });

    // Other amount button
    const otherBtn = document.getElementById('step1OtherBtn');
    const otherInput = document.getElementById('otherAmount') as HTMLInputElement;
    if (otherBtn) {
      otherBtn.addEventListener('click', () => {
        otherInput?.focus();
      });
    }

    // Other amount input
    if (otherInput) {
      otherInput.addEventListener('input', () => {
        if (otherInput.value) {
          this.selectedAmount = parseFloat(otherInput.value);
          // Remove active state from preset buttons
          document.querySelectorAll('.btn-amount').forEach((btn) => {
            btn.classList.remove('active');
          });
        }
      });
    }

    // Pet selection
    const petSelect = document.getElementById('petSelect') as HTMLSelectElement;
    if (petSelect) {
      petSelect.addEventListener('change', () => {
        this.selectedPet = petSelect.value;
      });
    }

    // Recurring gift checkbox
    const recurringCheckbox = document.getElementById('recurringGift') as HTMLInputElement;
    if (recurringCheckbox) {
      recurringCheckbox.addEventListener('change', () => {
        this.isRecurring = recurringCheckbox.checked;
      });
    }

    // Next button
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.proceed());
    }
  }

  private selectAmount(e: Event): void {
    const btn = e.target as HTMLButtonElement;
    const amount = btn.getAttribute('data-amount');

    if (amount) {
      this.selectedAmount = parseFloat(amount);

      // Update UI
      document.querySelectorAll('.btn-amount').forEach((btn) => {
        btn.classList.remove('active');
      });
      btn.classList.add('active');

      // Clear other amount input if it was used
      const otherInput = document.getElementById('otherAmount') as HTMLInputElement;
      if (otherInput) {
        otherInput.value = '';
      }
    }
  }

  private proceed(): void {
    // Validate amount selection
    if (!this.selectedAmount || this.selectedAmount <= 0) {
      alert('Please select or enter a valid donation amount');
      return;
    }

    // Store selection in session storage
    sessionStorage.setItem('donationAmount', this.selectedAmount.toString());
    sessionStorage.setItem('donationPet', this.selectedPet || '');
    sessionStorage.setItem('donationRecurring', this.isRecurring.toString());

    // Redirect to Step 2
    window.location.href = '../step2/index.html';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new DonationStep1();
});
