/**
 * Shared utility functions for BuildFit application
 */

import { VALIDATION } from '../constants';

// Validation Utilities
export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= VALIDATION.EMAIL.MAX_LENGTH;
  },

  password: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
      errors.push(`Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters long`);
    }
    
    if (password.length > VALIDATION.PASSWORD.MAX_LENGTH) {
      errors.push(`Password must be no more than ${VALIDATION.PASSWORD.MAX_LENGTH} characters long`);
    }
    
    if (VALIDATION.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (VALIDATION.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (VALIDATION.PASSWORD.REQUIRE_NUMBERS && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (VALIDATION.PASSWORD.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  name: (name: string): boolean => {
    return name.length >= VALIDATION.NAME.MIN_LENGTH && 
           name.length <= VALIDATION.NAME.MAX_LENGTH &&
           /^[a-zA-Z\s'-]+$/.test(name);
  },

  required: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },
};

// Date and Time Utilities
export const dateUtils = {
  formatDate: (date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string => {
    const d = new Date(date);
    
    switch (format) {
      case 'short':
        return d.toLocaleDateString();
      case 'long':
        return d.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'relative':
        return getRelativeTime(d);
      default:
        return d.toLocaleDateString();
    }
  },

  formatTime: (date: string | Date): string => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  },

  formatDuration: (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  },

  isToday: (date: string | Date): boolean => {
    const today = new Date();
    const compareDate = new Date(date);
    
    return today.toDateString() === compareDate.toDateString();
  },

  isThisWeek: (date: string | Date): boolean => {
    const today = new Date();
    const compareDate = new Date(date);
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    
    return compareDate >= startOfWeek;
  },

  daysBetween: (date1: string | Date, date2: string | Date): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },
};

// Helper function for relative time
const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
};

// Number and Math Utilities
export const mathUtils = {
  round: (num: number, decimals: number = 2): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  },

  percentage: (value: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  },

  average: (numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  },

  sum: (numbers: number[]): number => {
    return numbers.reduce((sum, num) => sum + num, 0);
  },

  max: (numbers: number[]): number => {
    return Math.max(...numbers);
  },

  min: (numbers: number[]): number => {
    return Math.min(...numbers);
  },
};

// Unit Conversion Utilities
export const unitUtils = {
  weight: {
    kgToLbs: (kg: number): number => mathUtils.round(kg * 2.20462),
    lbsToKg: (lbs: number): number => mathUtils.round(lbs / 2.20462),
    convert: (value: number, from: 'kg' | 'lbs', to: 'kg' | 'lbs'): number => {
      if (from === to) return value;
      if (from === 'kg' && to === 'lbs') return unitUtils.weight.kgToLbs(value);
      if (from === 'lbs' && to === 'kg') return unitUtils.weight.lbsToKg(value);
      return value;
    },
  },

  height: {
    cmToInches: (cm: number): number => mathUtils.round(cm / 2.54),
    inchesToCm: (inches: number): number => mathUtils.round(inches * 2.54),
    cmToFeet: (cm: number): string => {
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return `${feet}'${inches}"`;
    },
    convert: (value: number, from: 'cm' | 'in', to: 'cm' | 'in'): number => {
      if (from === to) return value;
      if (from === 'cm' && to === 'in') return unitUtils.height.cmToInches(value);
      if (from === 'in' && to === 'cm') return unitUtils.height.inchesToCm(value);
      return value;
    },
  },

  distance: {
    metersToFeet: (meters: number): number => mathUtils.round(meters * 3.28084),
    feetToMeters: (feet: number): number => mathUtils.round(feet / 3.28084),
    kmToMiles: (km: number): number => mathUtils.round(km * 0.621371),
    milesToKm: (miles: number): number => mathUtils.round(miles / 0.621371),
  },
};

// String Utilities
export const stringUtils = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  capitalizeWords: (str: string): string => {
    return str.split(' ').map(word => stringUtils.capitalize(word)).join(' ');
  },

  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  truncate: (str: string, maxLength: number, ellipsis: string = '...'): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - ellipsis.length) + ellipsis;
  },

  removeSpaces: (str: string): string => {
    return str.replace(/\s+/g, '');
  },

  isEmptyOrWhitespace: (str: string): boolean => {
    return !str || str.trim().length === 0;
  },
};

// Array Utilities
export const arrayUtils = {
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },

  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  groupBy: <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  sortBy: <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  },
};

// Object Utilities
export const objectUtils = {
  pick: <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  omit: <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },

  isEmpty: (obj: object): boolean => {
    return Object.keys(obj).length === 0;
  },

  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },
};

// Storage Utilities (for consistent local storage handling)
export const storageUtils = {
  setItem: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },

  getItem: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return defaultValue || null;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

// Debounce Utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle Utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Export all utilities
export default {
  validation,
  dateUtils,
  mathUtils,
  unitUtils,
  stringUtils,
  arrayUtils,
  objectUtils,
  storageUtils,
  debounce,
  throttle,
};
