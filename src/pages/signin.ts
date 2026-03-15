import { login } from '../services/apiService.js';
import { AuthRequest } from '../interfaces/types.js';

class SignInPage {
    private form: HTMLFormElement | null;
    private submitBtn: HTMLButtonElement | null;

    constructor() {
        this.form = document.getElementById('signin-form') as HTMLFormElement;
        this.submitBtn = document.querySelector('.signin-btn') as HTMLButtonElement;

        this.init();
    }

    private init(): void {
        this.loadHeader();
        this.setupEventListeners();
    }

    private async loadHeader(): Promise<void> {
        try {
            const response = await fetch('../components/header.html');
            const headerHTML = await response.text();
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = headerHTML;
                // Initialize header component after header HTML is loaded
                if ((window as any).initializeHeader) {
                    (window as any).initializeHeader();
                }
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    private setupEventListeners(): void {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Add input validation on blur
            const inputs = this.form.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateInput(input as HTMLInputElement));
                input.addEventListener('input', () => this.clearError(input as HTMLInputElement));
            });
        }
    }

    private validateInput(input: HTMLInputElement): boolean {
        const errorIcon = input.parentElement?.querySelector('.error-icon') as HTMLElement;
        const errorMessage = input.parentElement?.querySelector('.error-message') as HTMLElement;

        let isValid = true;
        let message = '';

        const value = input.value.trim();

        switch (input.id) {
            case 'signin-login':
                if (!value) {
                    isValid = false;
                    message = 'Login is required';
                }
                break;

            case 'signin-password':
                if (!value) {
                    isValid = false;
                    message = 'Password is required';
                }
                break;
        }

        if (!isValid) {
            input.classList.add('input-error');
            if (errorIcon) errorIcon.style.display = 'block';
            if (errorMessage) {
                errorMessage.textContent = message;
                errorMessage.style.display = 'block';
            }
        } else {
            input.classList.remove('input-error');
            if (errorIcon) errorIcon.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';
        }

        return isValid;
    }

    private clearError(input: HTMLInputElement): void {
        const errorIcon = input.parentElement?.querySelector('.error-icon') as HTMLElement;
        const errorMessage = input.parentElement?.querySelector('.error-message') as HTMLElement;

        input.classList.remove('input-error');
        if (errorIcon) errorIcon.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
    }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();

        if (!this.form || !this.submitBtn) return;

        // Validate all inputs
        const inputs = this.form.querySelectorAll('.form-input');
        let allValid = true;
        inputs.forEach(input => {
            if (!this.validateInput(input as HTMLInputElement)) {
                allValid = false;
            }
        });

        if (!allValid) {
            return;
        }

        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Signing In...';

        const formData = new FormData(this.form);
        const authRequest: AuthRequest = {
            login: (formData.get('login') as string).trim(),
            password: formData.get('password') as string
        };

        try {
            const response = await login(authRequest);

            // Store user data
            localStorage.setItem('authToken', response.data.access_token);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('userName', response.data.user.name);

            // Show success message
            this.showSuccess('Signed in successfully! Redirecting...');

            // Redirect to home page after short delay
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2000);

        } catch (error: unknown) {
            console.error('Sign in error:', error);

            // Reset button
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'SIGN IN →';

            // Show error message
            const errorMsg = error instanceof Error ? error.message : 'Sign in failed. Please check your credentials.';
            this.showError(errorMsg);
        }
    }

    private showSuccess(message: string): void {
        const container = document.querySelector('.signin-form-container');
        if (container) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.textContent = message;
            container.insertBefore(successDiv, container.firstChild);
        }
    }

    private showError(message: string): void {
        const container = document.querySelector('.signin-form-container');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #f5c6cb; text-align: center; font-weight: 500;';
            errorDiv.textContent = message;
            container.insertBefore(errorDiv, container.firstChild);

            // Remove error message after 5 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }
    }
}

// Initialize sign in page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SignInPage();
});