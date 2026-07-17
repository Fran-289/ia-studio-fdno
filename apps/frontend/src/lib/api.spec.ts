import { endpoints } from './api';

describe('API endpoints', () => {
  it('should have auth endpoints', () => {
    expect(endpoints.auth.login).toBe('/auth/login');
    expect(endpoints.auth.register).toBe('/auth/register');
    expect(endpoints.auth.me).toBe('/auth/me');
  });

  it('should have projects endpoints', () => {
    expect(endpoints.projects.list).toBe('/projects');
    expect(endpoints.projects.get('123')).toBe('/projects/123');
    expect(endpoints.projects.delete('123')).toBe('/projects/123');
  });

  it('should have payments endpoints', () => {
    expect(endpoints.payments.createCheckout).toBe('/payments/create-checkout');
    expect(endpoints.payments.subscription).toBe('/payments/subscription');
  });

  it('should have storage endpoints', () => {
    expect(endpoints.storage.upload).toBe('/storage/upload');
    expect(endpoints.storage.delete).toBe('/storage/delete');
  });

  it('should have AI endpoints', () => {
    expect(endpoints.images.generate).toBe('/ai/images/generate');
    expect(endpoints.voice.textToSpeech).toBe('/ai/voice/text-to-speech');
  });
});
