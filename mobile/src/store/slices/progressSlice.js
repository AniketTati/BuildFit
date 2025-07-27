import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  progressData: {
    weight: [],
    bodyFat: [],
    measurements: {},
    photos: [],
  },
  exerciseRecords: {}, // { exerciseId: { weight: maxWeight, reps: maxReps, volume: totalVolume } }
  workoutStats: {
    totalWorkouts: 0,
    totalDuration: 0,
    averageDuration: 0,
    workoutsThisWeek: 0,
    workoutsThisMonth: 0,
    currentStreak: 0,
    longestStreak: 0,
  },
  achievements: [],
  goals: [],
  selectedPeriod: 'month', // 'week', 'month', '3months', 'year'
  isLoading: false,
  error: null,
};

// Progress slice
const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Set progress data
    setProgressData: (state, action) => {
      state.progressData = { ...state.progressData, ...action.payload };
      state.isLoading = false;
      state.error = null;
    },
    
    // Add weight entry
    addWeightEntry: (state, action) => {
      state.progressData.weight.push({
        date: new Date().toISOString(),
        weight: action.payload,
      });
      // Sort by date
      state.progressData.weight.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    
    // Add body fat entry
    addBodyFatEntry: (state, action) => {
      state.progressData.bodyFat.push({
        date: new Date().toISOString(),
        bodyFat: action.payload,
      });
      // Sort by date
      state.progressData.bodyFat.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    
    // Update measurements
    updateMeasurements: (state, action) => {
      const { date = new Date().toISOString(), measurements } = action.payload;
      state.progressData.measurements[date] = measurements;
    },
    
    // Add progress photo
    addProgressPhoto: (state, action) => {
      state.progressData.photos.push({
        date: new Date().toISOString(),
        uri: action.payload.uri,
        type: action.payload.type || 'front', // 'front', 'side', 'back'
      });
      // Sort by date
      state.progressData.photos.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    
    // Set exercise records
    setExerciseRecords: (state, action) => {
      state.exerciseRecords = action.payload;
    },
    
    // Update exercise record
    updateExerciseRecord: (state, action) => {
      const { exerciseId, record } = action.payload;
      state.exerciseRecords[exerciseId] = {
        ...state.exerciseRecords[exerciseId],
        ...record,
      };
    },
    
    // Set workout stats
    setWorkoutStats: (state, action) => {
      state.workoutStats = { ...state.workoutStats, ...action.payload };
    },
    
    // Update workout stats
    updateWorkoutStats: (state, action) => {
      state.workoutStats = { ...state.workoutStats, ...action.payload };
    },
    
    // Increment workout count
    incrementWorkoutCount: (state) => {
      state.workoutStats.totalWorkouts += 1;
      state.workoutStats.workoutsThisWeek += 1;
      state.workoutStats.workoutsThisMonth += 1;
    },
    
    // Add workout duration
    addWorkoutDuration: (state, action) => {
      const duration = action.payload;
      state.workoutStats.totalDuration += duration;
      state.workoutStats.averageDuration = 
        state.workoutStats.totalDuration / state.workoutStats.totalWorkouts;
    },
    
    // Update streak
    updateStreak: (state, action) => {
      const newStreak = action.payload;
      state.workoutStats.currentStreak = newStreak;
      if (newStreak > state.workoutStats.longestStreak) {
        state.workoutStats.longestStreak = newStreak;
      }
    },
    
    // Set achievements
    setAchievements: (state, action) => {
      state.achievements = action.payload;
    },
    
    // Add achievement
    addAchievement: (state, action) => {
      const achievement = {
        ...action.payload,
        earnedAt: new Date().toISOString(),
      };
      state.achievements.push(achievement);
    },
    
    // Set goals
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
    
    // Add goal
    addGoal: (state, action) => {
      const goal = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      state.goals.push(goal);
    },
    
    // Update goal
    updateGoal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.goals.findIndex(goal => goal.id === id);
      if (index !== -1) {
        state.goals[index] = { ...state.goals[index], ...updates };
      }
    },
    
    // Complete goal
    completeGoal: (state, action) => {
      const goalId = action.payload;
      const index = state.goals.findIndex(goal => goal.id === goalId);
      if (index !== -1) {
        state.goals[index].status = 'completed';
        state.goals[index].completedAt = new Date().toISOString();
      }
    },
    
    // Set selected period
    setSelectedPeriod: (state, action) => {
      state.selectedPeriod = action.payload;
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
    
    // Reset progress data
    resetProgress: (state) => {
      return initialState;
    },
  },
});

// Export actions
export const {
  setLoading,
  setProgressData,
  addWeightEntry,
  addBodyFatEntry,
  updateMeasurements,
  addProgressPhoto,
  setExerciseRecords,
  updateExerciseRecord,
  setWorkoutStats,
  updateWorkoutStats,
  incrementWorkoutCount,
  addWorkoutDuration,
  updateStreak,
  setAchievements,
  addAchievement,
  setGoals,
  addGoal,
  updateGoal,
  completeGoal,
  setSelectedPeriod,
  setError,
  clearError,
  resetProgress,
} = progressSlice.actions;

// Selectors
export const selectProgressData = (state) => state.progress.progressData;
export const selectExerciseRecords = (state) => state.progress.exerciseRecords;
export const selectWorkoutStats = (state) => state.progress.workoutStats;
export const selectAchievements = (state) => state.progress.achievements;
export const selectGoals = (state) => state.progress.goals;
export const selectSelectedPeriod = (state) => state.progress.selectedPeriod;
export const selectProgressLoading = (state) => state.progress.isLoading;
export const selectProgressError = (state) => state.progress.error;

// Computed selectors
export const selectActiveGoals = (state) => 
  state.progress.goals.filter(goal => goal.status === 'active');

export const selectCompletedGoals = (state) => 
  state.progress.goals.filter(goal => goal.status === 'completed');

export const selectRecentAchievements = (state) => 
  state.progress.achievements
    .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
    .slice(0, 5);

export const selectLatestWeight = (state) => {
  const weights = state.progress.progressData.weight;
  return weights.length > 0 ? weights[weights.length - 1] : null;
};

export const selectLatestBodyFat = (state) => {
  const bodyFat = state.progress.progressData.bodyFat;
  return bodyFat.length > 0 ? bodyFat[bodyFat.length - 1] : null;
};

// Export reducer
export default progressSlice.reducer;
