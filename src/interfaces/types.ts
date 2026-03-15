// API Response Interfaces

export interface Pet {
  id: number;
  name: string;
  commonName?: string;
  description: string;
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Camera {
  id: number;
  name: string;
  location: string;
  streamUrl: string;
  petId?: number;
}

export interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp?: string;
}

export interface User {
  id: number;
  login: string;
  name: string;
  email: string;
}

export interface DonationRequest {
  name: string;
  email: string;
  amount: number;
  petId: number;
}

export interface Donation extends DonationRequest {
  id: number;
  timestamp: string;
}

export interface AuthRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
    data: {
        access_token: string;
        user: User;
    }
}

export interface RegisterRequest {
  login: string;
  password: string;
  name: string;
  email: string;
}

export interface ApiError {
  message: string;
  status: number;
}