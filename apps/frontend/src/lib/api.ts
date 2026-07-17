import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    verify: '/auth/verify',
    me: '/auth/me',
  },
  projects: {
    list: '/projects',
    create: '/projects',
    get: (id: string) => `/projects/${id}`,
    update: (id: string) => `/projects/${id}`,
    delete: (id: string) => `/projects/${id}`,
    duplicate: (id: string) => `/projects/${id}/duplicate`,
  },
  images: {
    generate: '/ai/images/generate',
    edit: '/ai/images/edit',
    removeBackground: '/ai/images/remove-background',
    upscale: '/ai/images/upscale',
  },
  videos: {
    generate: '/ai/videos/generate',
    edit: '/ai/videos/edit',
  },
  voice: {
    textToSpeech: '/ai/voice/text-to-speech',
    clone: '/ai/voice/clone',
    translate: '/ai/voice/translate',
  },
  storage: {
    upload: '/storage/upload',
    delete: '/storage/delete',
  },
  payments: {
    createCheckout: '/payments/create-checkout',
    subscription: '/payments/subscription',
  },
  user: {
    profile: '/user/profile',
    update: '/user/update',
    credits: '/user/credits',
  },
};
