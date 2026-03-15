import { login, register } from '../services/apiService.js';
import { AuthRequest, RegisterRequest } from '../interfaces/types.js';

class HeaderComponent {
  private userIconBtn: HTMLButtonElement | null;
  private userAvatar: HTMLImageElement | null;
  private userNameSpan: HTMLSpanElement | null;
  private donateBtn: HTMLButtonElement | null;

  constructor() {
    this.userIconBtn = document.getElementById('user-icon-btn') as HTMLButtonElement;
    this.userAvatar = document.getElementById('user-avatar') as HTMLImageElement;
    this.userNameSpan = document.getElementById('user-name') as HTMLSpanElement;
    this.donateBtn = document.getElementById('btn-donate') as HTMLButtonElement;

    this.init();
  }

  private init(): void {
    if (!this.userIconBtn) {
      console.warn('Header elements not found, retrying...');
      setTimeout(() => this.init(), 1000);
      return;
    }
    this.setupEventListeners();
    this.renderUserState();
    
    // Listen for storage changes (when user logs in on another tab or after registration)
    window.addEventListener('storage', () => {
      this.renderUserState();
    });
  }

  private setupEventListeners(): void {
    if (this.userIconBtn) {
      this.userIconBtn.addEventListener('click', () => this.handleUserClick());
    }

    if (this.donateBtn) {
      this.donateBtn.addEventListener('click', () => this.handleDonateClick());
    }
  }

  private handleUserClick(): void {
    const isLoggedIn = this.isUserLoggedIn();
    
    if (!isLoggedIn) {
      // Redirect to register page
      window.location.href = '/pages/register/index.html';
    }
    // If logged in, we could show a menu or profile, but for now just do nothing
  }

  private handleDonateClick(): void {
    // Redirect to Step 1 of the donation flow
    // Use relative path that works from any page
    const currentPath = window.location.pathname;
    let basePath = '/';
    
    if (currentPath.includes('/pages/')) {
      basePath = '../../';
    }
    
    window.location.href = basePath + 'pages/donation/donation_step/step1/index.html';
  }

  private renderUserState(): void {
    const isLoggedIn = this.isUserLoggedIn();

    if (isLoggedIn) {
      this.showUserName();
    } else {
      this.showUserIcon();
    }
  }

  private isUserLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getUserName(): string {
    const userName = localStorage.getItem('userName') || 'test';
    // Extract first name if full name is stored
    if (userName) {
      const names = userName.split(' ');
      return names[0]; // Return first name
    }
    return 'tes1t';
  }

  private showUserIcon(): void {
    if (this.userAvatar && this.userNameSpan) {
      this.userAvatar.style.display = 'block';
      this.userNameSpan.style.display = 'none';
    }
  }

  private showUserName(): void {
    const firstName = this.getUserName();
    if (this.userNameSpan && this.userAvatar && firstName) {
      this.userAvatar.style.display = 'none';
      this.userNameSpan.style.display = 'inline';
      this.userNameSpan.textContent = firstName;
    }
  }
}

// Global function to initialize header
function initializeHeader(): void {
  new HeaderComponent();
}

// Make it globally accessible
(window as any).initializeHeader = initializeHeader;

// Also try to initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => new HeaderComponent(), 100);
  });
} else {
  setTimeout(() => new HeaderComponent(), 100);
}