fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        // Initialize header component after header HTML is loaded
        if ((window as any).initializeHeader) {
          (window as any).initializeHeader();
        }
      }
    });

// donation section trigger on live zoo page
function initLivezooDonation(): void {
  const input = document.getElementById('livezooDonationInput') as HTMLInputElement;
  const btn = document.getElementById('livezooDonationBtn');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let amount: string | null = null;
      if (input) {
        amount = input.value.trim() || null;
      }
      if ((window as any).donationStep1Instance) {
        (window as any).donationStep1Instance.open(amount);
      } else {
        window.location.href = '/pages/donation/index.html';
      }
    });
  }
}

// initialize additional features on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initLivezooDonation();
  });
} else {
  initLivezooDonation();
}