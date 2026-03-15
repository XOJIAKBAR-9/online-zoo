import { getPets, getFeedback } from '../services/apiService';
import { Pet, Feedback, ApiError } from '../interfaces/types';

// Load header
fetch('/pages/components/header.html')
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
    })
    .catch(error => console.error('Error loading header:', error));

// Check if user is logged in
function isLoggedIn(): boolean {
  return !!localStorage.getItem('authToken');
}

// Show loader
function showLoader(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = '<div class="loader">Loading...</div>';
  }
}

// Hide loader
function hideLoader(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    const loader = element.querySelector('.loader');
    if (loader) loader.remove();
  }
}

// Show error
function showError(elementId: string, message: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = `<div class="error">${message}</div>`;
  }
}

// Fetch and display pets slider
async function loadPetsSlider(): Promise<void> {
  const sliderContainer = document.getElementById('pets-slider');
  if (!sliderContainer) return;

  showLoader('pets-slider');

  try {
    const pets: Pet[] = await getPets();
    hideLoader('pets-slider');

    if (pets.length === 0) {
      sliderContainer.innerHTML = '<p>No pets available.</p>';
      return;
    }

    // Create slider HTML
    const sliderHTML = `
      <div class="pets-slider">
        <button class="slider-btn prev" id="prev-btn">&lt;</button>
        <div class="slider-content" id="slider-content">
          ${pets.map(pet => `
            <div class="pet-card">
              <img src="${pet.image || '/assets/images/default-pet.png'}" alt="${pet.name}" onerror="this.src='/assets/images/default-pet.png'">
              <h3>${pet.name}</h3>
              <p>${pet.description}</p>
              ${pet.commonName ? `<p><em>${pet.commonName}</em></p>` : ''}
            </div>
          `).join('')}
        </div>
        <button class="slider-btn next" id="next-btn">&gt;</button>
      </div>
    `;

    sliderContainer.innerHTML = sliderHTML;

    // Add slider functionality
    initSlider();

  } catch (error) {
    hideLoader('pets-slider');
    const message = (error as ApiError).message || 'Failed to load pets.';
    showError('pets-slider', message);
  }
}

// Initialize slider
function initSlider(): void {
  const content = document.getElementById('slider-content') as HTMLElement;
  const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
  const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;

  if (!content || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = content.querySelectorAll('.pet-card');
  const totalCards = cards.length;

  function updateSlider(): void {
    const offset = -currentIndex * 100;
    content.style.transform = `translateX(${offset}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
    updateSlider();
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
    updateSlider();
  }, 5000);
}

// Fetch and display feedback
async function loadFeedback(): Promise<void> {
  const feedbackContainer = document.getElementById('feedback-section');
  if (!feedbackContainer) return;

  showLoader('feedback-section');

  try {
    const feedbacks: Feedback[] = await getFeedback();
    hideLoader('feedback-section');

    if (feedbacks.length === 0) {
      feedbackContainer.innerHTML = '<p>No feedback available.</p>';
      return;
    }

    const feedbackHTML = `
      <h2>What Our Visitors Say</h2>
      <div class="feedback-list">
        ${feedbacks.slice(0, 3).map(fb => `
          <div class="feedback-item">
            <p>"${fb.message}"</p>
            <cite>- ${fb.name}</cite>
          </div>
        `).join('')}
      </div>
    `;

    feedbackContainer.innerHTML = feedbackHTML;

  } catch (error) {
    hideLoader('feedback-section');
    const message = (error as ApiError).message || 'Failed to load feedback.';
    showError('feedback-section', message);
  }
}

// Handle user experience
function handleUserExperience(): void {
  const loggedIn = isLoggedIn();
  const donateBtn = document.querySelector('.btn-primary') as HTMLAnchorElement;

  if (!loggedIn && donateBtn) {
    // For non-registered users, show login prompt on donate click
    donateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Please log in to make a donation.');
      // Could redirect to login page
      window.location.href = '/pages/signin/index.html';
    });
  }
}

// Landing page donation section trigger
function initLandingDonation(): void {
  const input = document.getElementById('landingDonationInput') as HTMLInputElement;
  const btn = document.getElementById('landingDonationBtn');
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  loadPetsSlider();
  loadFeedback();
  handleUserExperience();
  initLandingDonation();
});