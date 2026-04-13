// Donation Button Handler - handles both footer and CTA buttons
function initDonationButtons(): void {
  const donationButtons = [
    document.getElementById('footerDonateBtn'),
    document.getElementById('ctaDonateBtn')
  ] as HTMLButtonElement[];
  
  donationButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        // Redirect to Step 1 of donation flow
        const currentPath = window.location.pathname;
        let basePath = '/';
        
        if (currentPath.includes('/pages/')) {
          basePath = '../../';
        }
        
        window.location.href = basePath + 'pages/donation/donation_step/step1/index.html';
      });
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initDonationButtons();
  });
} else {
  initDonationButtons();
}
