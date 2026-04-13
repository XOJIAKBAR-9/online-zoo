// Volunteer Donation Button Handler
function initVolunteerDonationButton(): void {
  const volunteerDonateBtn = document.getElementById('volunteerDonateBtn') as HTMLButtonElement;
  
  if (volunteerDonateBtn) {
    volunteerDonateBtn.addEventListener('click', () => {
      // Open the donation modal using the global instance
      const modal = (window as any).donationModalInstance;
      if (modal && typeof modal.openModal === 'function') {
        modal.openModal();
      } else {
        console.error('Donation modal instance not found');
      }
    });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initVolunteerDonationButton();
  });
} else {
  initVolunteerDonationButton();
}
