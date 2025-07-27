/**
 * Shared TypeScript types for BuildFit application
 * Used across mobile app and backend
 */

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  heightCm?: number;
  weightKg?: number;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  fitnessGoals?: string[];
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  location?: string;
  socialLinks?: SocialLinks;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  website?: string;
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  workoutReminders: boolean;
  socialUpdates: boolean;
  progressReports: boolean;
  communityActivity: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  workoutVisibility: 'public' | 'friends' | 'private';
  statsVisibility: 'public' | 'friends' | 'private';
}

export interface UserStats {
  totalWorkouts: number;
  totalDuration: number; // in minutes
  totalCaloriesBurned: number;
  currentStreak: number;
  longestStreak: number;
  favoriteExerciseType: string;
}

// Exercise Types
export interface Exercise {
  id: string;
  name: string;
  description?: string;
  instructions?: string;
  muscleGroups: string[];
  equipmentNeeded: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  exerciseType: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'sport';
  demoVideoUrl?: string;
  demoImageUrl?: string;
  estimatedCaloriesPerMinute?: number;
  isCustom: boolean;
  createdByUserId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseSet {
  id: string;
  exerciseId: string;
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  distance?: number; // in meters
  restPeriod?: number; // in seconds
  notes?: string;
  completedAt?: string;
}

// Workout Types
export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  createdByUserId: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  estimatedDurationMinutes?: number;
  estimatedCaloriesBurned?: number;
  targetMuscleGroups: string[];
  equipmentNeeded: string[];
  tags: string[];
  isPublic: boolean;
  isTemplate: boolean;
  likesCount: number;
  usesCount: number;
  exercises: WorkoutExercise[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutExercise {
  id: string;
  workoutPlanId: string;
  exerciseId: string;
  order: number;
  targetSets?: number;
  targetReps?: number;
  targetWeight?: number;
  targetDuration?: number;
  restPeriod?: number;
  notes?: string;
  exercise?: Exercise; // Populated when needed
}

export interface WorkoutSession {
  id: string;
  userId: string;
  workoutPlanId?: string;
  name: string;
  startedAt: string;
  completedAt?: string;
  duration?: number; // in minutes
  caloriesBurned?: number;
  notes?: string;
  exercises: WorkoutSessionExercise[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutSessionExercise {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
  order: number;
  sets: ExerciseSet[];
  notes?: string;
  exercise?: Exercise; // Populated when needed
}

// Progress Tracking Types
export interface ProgressEntry {
  id: string;
  userId: string;
  type: 'weight' | 'body_fat' | 'muscle_mass' | 'measurement';
  value: number;
  unit: string;
  bodyPart?: string; // for measurements
  notes?: string;
  recordedAt: string;
  createdAt: string;
}

export interface ProgressPhoto {
  id: string;
  userId: string;
  imageUrl: string;
  type: 'front' | 'side' | 'back' | 'custom';
  notes?: string;
  takenAt: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Form Types
export interface WorkoutPlanFormData {
  name: string;
  description?: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  targetMuscleGroups: string[];
  equipmentNeeded: string[];
  tags: string[];
  isPublic: boolean;
  exercises: WorkoutExerciseFormData[];
}

export interface WorkoutExerciseFormData {
  exerciseId: string;
  targetSets?: number;
  targetReps?: number;
  targetWeight?: number;
  targetDuration?: number;
  restPeriod?: number;
  notes?: string;
}

// Filter and Search Types
export interface ExerciseFilters {
  muscleGroups?: string[];
  equipmentNeeded?: string[];
  difficultyLevel?: string[];
  exerciseType?: string[];
  search?: string;
}

export interface WorkoutFilters {
  difficultyLevel?: string[];
  targetMuscleGroups?: string[];
  equipmentNeeded?: string[];
  tags?: string[];
  search?: string;
  createdByUserId?: string;
}

// Statistics Types
export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  averageDuration: number;
  workoutsThisWeek: number;
  workoutsThisMonth: number;
  favoriteExercises: { exerciseId: string; count: number }[];
  progressTrend: 'improving' | 'maintaining' | 'declining';
}

export interface ExerciseStats {
  exerciseId: string;
  totalSessions: number;
  bestSet: ExerciseSet;
  progressData: ProgressDataPoint[];
  lastPerformed: string;
}

export interface ProgressDataPoint {
  date: string;
  value: number;
  metric: 'weight' | 'reps' | 'duration' | 'distance';
}

// Utility Types
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: string;
  direction: SortDirection;
}

export type MuscleGroup = 
  | 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' 
  | 'forearms' | 'abs' | 'obliques' | 'quads' | 'hamstrings' 
  | 'glutes' | 'calves' | 'cardio' | 'full_body';

export type Equipment = 
  | 'bodyweight' | 'dumbbells' | 'barbell' | 'kettlebell' 
  | 'resistance_bands' | 'pull_up_bar' | 'bench' | 'squat_rack' 
  | 'cable_machine' | 'treadmill' | 'stationary_bike' | 'rowing_machine';

// Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
}
