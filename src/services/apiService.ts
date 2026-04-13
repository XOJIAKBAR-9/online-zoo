import { Pet, Camera, Feedback, User, AuthRequest, AuthResponse, RegisterRequest, DonationRequest, Donation, ApiError } from '../interfaces/types.js';

const API_BASE = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = {
      message: `HTTP ${response.status}: ${response.statusText}`,
      status: response.status
    };
    throw error;
  }
  return response.json();
}

export async function getPets(): Promise<Pet[]> {
  const response = await fetch(`${API_BASE}/pets`);
  return handleResponse<Pet[]>(response);
}

export async function getPet(id: number): Promise<Pet> {
  const response = await fetch(`${API_BASE}/pets/${id}`);
  return handleResponse<Pet>(response);
}

export async function getCameras(): Promise<Camera[]> {
  const response = await fetch(`${API_BASE}/cameras`);
  return handleResponse<Camera[]>(response);
}

export async function getFeedback(): Promise<Feedback[]> {
  const response = await fetch(`${API_BASE}/feedback`);
  return handleResponse<Feedback[]>(response);
}

export async function login(auth: AuthRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(auth)
  });
  return handleResponse<AuthResponse>(response);
}

export async function register(reg: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reg)
  });
  return handleResponse<AuthResponse>(response);
}

export async function getProfile(): Promise<User> {
  const response = await fetch(`${API_BASE}/auth/profile`, {
    headers: getAuthHeaders()
  });
  return handleResponse<User>(response);
}

export async function submitDonation(donation: DonationRequest): Promise<Donation> {
  const response = await fetch(`${API_BASE}/donations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(donation)
  });
  return handleResponse<Donation>(response);
}