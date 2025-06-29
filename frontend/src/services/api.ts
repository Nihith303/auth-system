import axios from 'axios';
import { AuthResponse, LoginFormData, SignupFormData } from '../types/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Health check
  health: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // User signup
  signup: async (data: SignupFormData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return response.data;
  },

  // User login
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default api; 