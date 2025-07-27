/**
 * Shared constants for BuildFit application
 */

// API Configuration
export const API = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
} as const;

// Authentication
export const AUTH = {
  TOKEN_KEY: 'buildfit_access_token',
  REFRESH_TOKEN_KEY: 'buildfit_refresh_token',
  USER_KEY: 'buildfit_user',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes
} as const;

// Fitness Data
export const MUSCLE_GROUPS = [
  'chest',
  'back', 
  'shoulders',
  'biceps',
  'triceps',
  'forearms',
  'abs',
  'obliques',
  'quads',
  'hamstrings',
  'glutes',
  'calves',
  'cardio',
  'full_body',
] as const;

export const EQUIPMENT = [
  'bodyweight',
  'dumbbells',
  'barbell',
  'kettlebell',
  'resistance_bands',
  'pull_up_bar',
  'bench',
  'squat_rack',
  'cable_machine',
  'treadmill',
  'stationary_bike',
  'rowing_machine',
  'medicine_ball',
  'foam_roller',
  'yoga_mat',
] as const;

export const EXERCISE_TYPES = [
  'strength',
  'cardio',
  'flexibility',
  'balance',
  'sport',
] as const;

export const DIFFICULTY_LEVELS = [
  'beginner',
  'intermediate', 
  'advanced',
] as const;

export const FITNESS_GOALS = [
  'weight_loss',
  'muscle_gain',
  'strength_building',
  'endurance',
  'flexibility',
  'general_fitness',
  'sports_performance',
  'rehabilitation',
] as const;

// Units and Measurements
export const UNITS = {
  WEIGHT: {
    METRIC: 'kg',
    IMPERIAL: 'lbs',
  },
  DISTANCE: {
    METRIC: 'm',
    IMPERIAL: 'ft',
  },
  HEIGHT: {
    METRIC: 'cm',
    IMPERIAL: 'in',
  },
} as const;

// App Configuration
export const APP = {
  NAME: 'BuildFit',
  VERSION: '1.0.0',
  DESCRIPTION: 'Your fitness journey starts here',
  SUPPORT_EMAIL: 'support@buildfit.app',
  WEBSITE: 'https://buildfit.app',
} as const;

// Validation Rules
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: false,
  },
  EMAIL: {
    MAX_LENGTH: 254,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  WORKOUT_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  EXERCISE_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  DESCRIPTION: {
    MAX_LENGTH: 1000,
  },
  NOTES: {
    MAX_LENGTH: 500,
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/mov', 'video/avi'],
} as const;

// Cache Keys
export const CACHE_KEYS = {
  EXERCISES: 'exercises',
  WORKOUT_PLANS: 'workout_plans',
  USER_PROFILE: 'user_profile',
  USER_STATS: 'user_stats',
  PROGRESS_DATA: 'progress_data',
} as const;

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  WORKOUT_REMINDER: 'workout_reminder',
  PROGRESS_UPDATE: 'progress_update',
  SOCIAL_ACTIVITY: 'social_activity',
  ACHIEVEMENT: 'achievement',
  SYSTEM: 'system',
} as const;

// Theme Colors
export const COLORS = {
  PRIMARY: '#2E86AB',
  SECONDARY: '#6C757D',
  SUCCESS: '#28A745',
  WARNING: '#FFC107',
  ERROR: '#DC3545',
  INFO: '#17A2B8',
  
  // Grays
  GRAY_50: '#F8F9FA',
  GRAY_100: '#E9ECEF',
  GRAY_200: '#DEE2E6',
  GRAY_300: '#CED4DA',
  GRAY_400: '#ADB5BD',
  GRAY_500: '#6C757D',
  GRAY_600: '#495057',
  GRAY_700: '#343A40',
  GRAY_800: '#212529',
  GRAY_900: '#000000',
  
  // App Specific
  BACKGROUND: '#F8F9FA',
  SURFACE: '#FFFFFF',
  TEXT_PRIMARY: '#212529',
  TEXT_SECONDARY: '#6C757D',
  TEXT_LIGHT: '#ADB5BD',
  
  // Muscle Group Colors
  CHEST: '#FF6B6B',
  BACK: '#4ECDC4',
  SHOULDERS: '#45B7D1',
  ARMS: '#96CEB4',
  LEGS: '#FECA57',
  CORE: '#FF9FF3',
  CARDIO: '#54A0FF',
} as const;

// Spacing
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const;

// Typography
export const TYPOGRAPHY = {
  FONT_SIZES: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 32,
  },
  FONT_WEIGHTS: {
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
  },
  LINE_HEIGHTS: {
    TIGHT: 1.2,
    NORMAL: 1.4,
    RELAXED: 1.6,
  },
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Screen Sizes (for responsive design)
export const SCREEN_SIZES = {
  SMALL: 360,
  MEDIUM: 768,
  LARGE: 1024,
} as const;

// Achievement Thresholds
export const ACHIEVEMENTS = {
  WORKOUTS: {
    FIRST_WORKOUT: 1,
    WEEK_WARRIOR: 7,
    MONTH_CHAMPION: 30,
    CENTURY_CLUB: 100,
  },
  STREAK: {
    CONSISTENT: 7,
    DEDICATED: 30,
    UNSTOPPABLE: 100,
  },
  DURATION: {
    HOUR_HERO: 60, // minutes
    MARATHON: 300, // minutes
  },
} as const;

// Social Features
export const SOCIAL = {
  MAX_FOLLOWERS: 10000,
  MAX_FOLLOWING: 7500,
  POST_TYPES: ['workout', 'progress', 'achievement', 'tip'],
} as const;

// Error Codes
export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: 'AUTH_001',
  TOKEN_EXPIRED: 'AUTH_002',
  TOKEN_INVALID: 'AUTH_003',
  USER_NOT_FOUND: 'AUTH_004',
  EMAIL_ALREADY_EXISTS: 'AUTH_005',
  
  // Validation
  VALIDATION_ERROR: 'VAL_001',
  REQUIRED_FIELD: 'VAL_002',
  INVALID_FORMAT: 'VAL_003',
  
  // General
  INTERNAL_ERROR: 'GEN_001',
  NOT_FOUND: 'GEN_002',
  PERMISSION_DENIED: 'GEN_003',
  RATE_LIMIT_EXCEEDED: 'GEN_004',
} as const;

export default {
  API,
  AUTH,
  MUSCLE_GROUPS,
  EQUIPMENT,
  EXERCISE_TYPES,
  DIFFICULTY_LEVELS,
  FITNESS_GOALS,
  UNITS,
  APP,
  VALIDATION,
  PAGINATION,
  FILE_UPLOAD,
  CACHE_KEYS,
  CACHE_DURATION,
  NOTIFICATION_TYPES,
  COLORS,
  SPACING,
  TYPOGRAPHY,
  ANIMATION,
  SCREEN_SIZES,
  ACHIEVEMENTS,
  SOCIAL,
  ERROR_CODES,
};
