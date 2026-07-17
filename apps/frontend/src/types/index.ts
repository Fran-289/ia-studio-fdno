export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
  credits: number;
  storageUsed: number;
  storageLimit: number;
  createdAt: Date;
}

export interface GenerationSettings {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  seed?: number;
  quantity?: number;
  creativity?: number;
  style?: string;
  model?: string;
}

export interface ImageGenerationSettings extends GenerationSettings {
  style:
    | 'realistic'
    | 'anime'
    | '3d'
    | 'pixar'
    | 'disney'
    | 'cyberpunk'
    | 'cinematic'
    | 'photography'
    | 'fantasy'
    | 'manga'
    | 'sketch'
    | 'oil-painting'
    | 'watercolor'
    | 'low-poly'
    | 'pixel-art'
    | 'logo'
    | 'sticker'
    | 'tattoo'
    | 'avatar';
}

export interface VideoGenerationSettings extends GenerationSettings {
  duration?: number;
  fps?: number;
  motion?: number;
  model?: 'veo' | 'runway' | 'kling' | 'luma';
}

export interface VoiceSettings {
  text: string;
  voice: string;
  language: string;
  speed?: number;
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'excited';
  pitch?: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  settings: ImageGenerationSettings;
  createdAt: Date;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  format: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  credits: number;
  creditsUsed: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
