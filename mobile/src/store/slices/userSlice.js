import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  profile: null,
  preferences: {
    units: 'metric', // 'metric' or 'imperial'
    defaultRestTime: 60, // seconds
    notifications: {
      workoutReminders: true,
      progressUpdates: true,
      socialActivity: true,
    },
    privacy: {
      profileVisibility: 'public', // 'public', 'friends', 'private'
      shareWorkouts: true,
      shareProgress: true,
    },
  },
  stats: {
    totalWorkouts: 0,
    totalHours: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalWeightLifted: 0,
  },
  isLoading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Set user profile
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    // Update profile
    updateProfile: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    
    // Update preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    
    // Update specific preference
    updatePreference: (state, action) => {
      const { key, value } = action.payload;
      state.preferences[key] = value;
    },
    
    // Update stats
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    
    // Increment workout count
    incrementWorkoutCount: (state) => {
      state.stats.totalWorkouts += 1;
    },
    
    // Add workout duration
    addWorkoutDuration: (state, action) => {
      state.stats.totalHours += action.payload;
    },
    
    // Update streak
    updateStreak: (state, action) => {
      state.stats.currentStreak = action.payload;
      if (action.payload > state.stats.longestStreak) {
        state.stats.longestStreak = action.payload;
      }
    },
    
    // Add weight lifted
    addWeightLifted: (state, action) => {
      state.stats.totalWeightLifted += action.payload;
    },
    
    // Set error
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset user data (on logout)
    resetUser: (state) => {
      return initialState;
    },
  },
});

// Export actions
export const {
  setLoading,
  setProfile,
  updateProfile,
  updatePreferences,
  updatePreference,
  updateStats,
  incrementWorkoutCount,
  addWorkoutDuration,
  updateStreak,
  addWeightLifted,
  setError,
  clearError,
  resetUser,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user;
export const selectProfile = (state) => state.user.profile;
export const selectPreferences = (state) => state.user.preferences;
export const selectStats = (state) => state.user.stats;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;

// Export reducer
export default userSlice.reducer;
