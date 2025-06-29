import { Request } from 'express';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, 'password'>;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Omit<User, 'password'>;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
} 