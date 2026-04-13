/*
 * Donation Step 1 Modal Logic
 * Manages the first step of the multi-step donation form.
 */
import { getPets } from '../services/apiService.js';
import { Pet } from '../interfaces/types.js';

export class DonationStep1 {
  private overlay: HTMLElement | null;
  private amountButtons: NodeListOf<HTMLElement>;
  private otherInput: HTMLInputElement | null;
  private petSelect: HTMLSelectElement | null;
  private recurringCheckbox: HTMLInputElement | null;
  private nextBtn: HTMLElement | null;
  private selectedAmount: string | number | null = null;

  constructor() {
    this.overlay = document.getElementById('donationStep1');
    this.amountButtons = document.querySelectorAll('#donationStep1 .btn-amount');
    this.otherInput = document.getElementById('otherAmount') as HTMLInputElement;
    this.petSelect = document.getElementById('petSelect') as HTMLSelectElement;
    this.recurringCheckbox = document.getElementById('recurringGift') as HTMLInputElement;
    this.nextBtn = document.querySelector('#donationStep1 .btn-next');

    this.attachListeners();
    this.loadPets();
  }

  /**
   * Load pets from API and populate the pet select dropdown
   */
  private async loadPets(): Promise<void> {
    if (!this.petSelect) return;

    try {
      const pets = await getPets();
      // Clear existing options except the first placeholder
      while (this.petSelect.options.length > 1) {
        this.petSelect.remove(1);
      }
      
      // Populate select with pets from API
      pets.forEach((pet: Pet) => {
        const option = document.createElement('option');
        option.value = pet.id.toString();
        option.textContent = pet.commonName || pet.name;
        this.petSelect!.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading pets:', error);
    }
  }

  /**
   * Wire up events for the step1 form
   */
  private attachListeners(): void {
    // preset amount buttons
    this.amountButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.amountButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedAmount = btn.dataset.amount || null;
        if (this.otherInput) this.otherInput.value = '';
      });
    });

    // focus on other amount input clears preset
    if (this.otherInput) {
      this.otherInput.addEventListener('focus', () => {
        this.amountButtons.forEach(b => b.classList.remove('active'));
        this.selectedAmount = null;
      });
    }

    // other amount button also focuses input
    const otherBtn = document.getElementById('step1OtherBtn');
    if (otherBtn && this.otherInput) {
      otherBtn.addEventListener('click', () => {
        this.otherInput!.focus();
      });
    }

    // next button
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToStep2());
    }

    // click outside modal closes (optional)
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }
  }

  /**
   * Show the modal and prepopulate amount if provided
   */
  public open(initialAmount?: number | string | null): void {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
    }
    this.resetForm();

    if (initialAmount !== undefined && initialAmount !== null) {
      // sanitize to digits only (strip dollar sign, spaces, etc.)
      let amountStr = String(initialAmount).replace(/[^0-9\.]/g, '');
      // if the cleaned string ends up empty, skip
      if (amountStr) {
        const preset = Array.from(this.amountButtons).find(b => b.dataset.amount === amountStr);
        if (preset) {
          preset.classList.add('active');
          this.selectedAmount = amountStr;
        } else if (this.otherInput) {
          this.otherInput.value = amountStr;
          this.selectedAmount = amountStr;
        }
      }
    }
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
    this.amountButtons.forEach(b => b.classList.remove('active'));
    if (this.otherInput) this.otherInput.value = '';
    if (this.petSelect) this.petSelect.selectedIndex = 0;
    if (this.recurringCheckbox) this.recurringCheckbox.checked = false;
    this.selectedAmount = null;
  }

  /**
   * Validate and proceed to step 2
   */
  private goToStep2(): void {
    let finalAmount = this.selectedAmount;
    if (!finalAmount && this.otherInput) {
      const v = this.otherInput.value.trim();
      if (v) finalAmount = v;
    }

    if (!finalAmount) {
      alert('Please choose or enter a donation amount.');
      return;
    }

    // close current overlay
    this.close();

    // dispatch event with Step 1 data
    const event = new CustomEvent('donationStep1Complete', {
      detail: {
        amount: finalAmount,
        pet: this.petSelect?.value,
        recurring: this.recurringCheckbox?.checked,
      },
    });
    window.dispatchEvent(event);

    console.log('Proceeding to Step 2 with:', {
      amount: finalAmount,
      pet: this.petSelect?.value,
      recurring: this.recurringCheckbox?.checked,
    });

    // Open Step 2 modal
    if ((window as any).donationStep2Instance) {
      (window as any).donationStep2Instance.open();
    }
  }
}

// instantiate once DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const step1 = new DonationStep1();
  (window as any).donationStep1Instance = step1;
});
