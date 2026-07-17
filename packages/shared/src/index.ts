export const PLANS = {
  FREE: { credits: 50, price: 0, storage: 1073741824 },
  PRO: { credits: 500, price: 19, storage: 10737418240 },
  BUSINESS: { credits: 2000, price: 49, storage: 53687091200 },
  ENTERPRISE: { credits: -1, price: -1, storage: -1 },
} as const;

export const CREDIT_COSTS = {
  IMAGE_GENERATION: 50,
  IMAGE_EDIT: 10,
  REMOVE_BACKGROUND: 20,
  UPSCALE: 30,
  VIDEO_GENERATION: 200,
  VIDEO_EDIT: 50,
  TEXT_TO_SPEECH: 30,
  VOICE_CLONE: 100,
  LOGO_GENERATION: 40,
  AVATAR_GENERATION: 40,
} as const;

export const IMAGE_STYLES = [
  'realistic', 'anime', '3d', 'pixar', 'disney', 'cyberpunk',
  'cinematic', 'photography', 'fantasy', 'manga', 'sketch',
  'oil-painting', 'watercolor', 'low-poly', 'pixel-art',
  'logo', 'sticker', 'tattoo', 'avatar',
] as const;

export const ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:2', '2:1'] as const;

export const VIDEO_MODELS = ['veo', 'runway', 'kling', 'luma'] as const;

export const EXPORT_FORMATS = ['PNG', 'JPG', 'WEBP', 'SVG', 'GIF', 'MP4', 'MOV', 'WEBM', 'PDF'] as const;

export const SOCIAL_PLATFORMS = [
  'instagram', 'tiktok', 'facebook', 'youtube', 'linkedin', 'pinterest', 'x',
] as const;

export const LANGUAGES = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
  { code: 'ar', name: 'العربية' },
] as const;
