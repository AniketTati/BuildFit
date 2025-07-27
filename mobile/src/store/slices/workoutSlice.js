import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  workouts: [],
  currentWorkout: null,
  workoutPlans: [],
  activeWorkoutPlan: null,
  workoutHistory: [],
  workoutCalendar: {}, // { 'YYYY-MM-DD': { workouts: [], totalCalories: 0, totalDuration: 0 } }
  workoutAnalytics: {
    weeklyStats: { workouts: 0, calories: 0, duration: 0 },
    monthlyStats: { workouts: 0, calories: 0, duration: 0 },
    consistencyScore: 0, // percentage of days with workouts
    averageIntensity: 0, // 1-5 scale
    progressionTrend: 'stable', // 'improving', 'stable', 'declining'
  },
  templates: [],
  isLoading: false,
  error: null,
  workoutStats: {
    totalWorkouts: 0,
    totalCalories: 0,
    totalDuration: 0,
  },
  workoutCalendar: [],
  workoutAnalytics: {},
};

// Workout slice
const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Set workouts
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    // Add workout
    addWorkout: (state, action) => {
      state.workouts.push(action.payload);
    },
    
    // Update workout
    updateWorkout: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.workouts.findIndex(workout => workout.id === id);
      if (index !== -1) {
        state.workouts[index] = { ...state.workouts[index], ...updates };
      }
    },
    
    // Delete workout
    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
    },
    
    // Start workout
    startWorkout: (state, action) => {
      state.currentWorkout = {
        ...action.payload,
        startTime: new Date().toISOString(),
        status: 'active',
        exercises: action.payload.exercises || [],
        completedSets: {},
      };
    },
    
    // End workout
    endWorkout: (state, action) => {
      if (state.currentWorkout) {
        const completedWorkout = {
          ...state.currentWorkout,
          endTime: new Date().toISOString(),
          status: 'completed',
          ...action.payload,
        };
        
        state.workoutHistory.unshift(completedWorkout);
        state.currentWorkout = null;
      }
    },
    
    // Update current workout
    updateCurrentWorkout: (state, action) => {
      if (state.currentWorkout) {
        state.currentWorkout = { ...state.currentWorkout, ...action.payload };
      }
    },
    
    // Complete set
    completeSet: (state, action) => {
      const { exerciseId, setIndex, setData } = action.payload;
      if (state.currentWorkout) {
        if (!state.currentWorkout.completedSets[exerciseId]) {
          state.currentWorkout.completedSets[exerciseId] = {};
        }
        state.currentWorkout.completedSets[exerciseId][setIndex] = {
          ...setData,
          completedAt: new Date().toISOString(),
        };
      }
    },
    
    // Set workout plans
    setWorkoutPlans: (state, action) => {
      state.workoutPlans = action.payload;
    },
    
    // Add workout plan
    addWorkoutPlan: (state, action) => {
      state.workoutPlans.push(action.payload);
    },
    
    // Set active workout plan
    setActiveWorkoutPlan: (state, action) => {
      state.activeWorkoutPlan = action.payload;
    },
    
    // Set workout history
    setWorkoutHistory: (state, action) => {
      state.workoutHistory = action.payload;
    },
    
    // Set templates
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
    
    // Add template
    addTemplate: (state, action) => {
      state.templates.push(action.payload);
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
    
    // Reset workout data
    resetWorkouts: (state) => {
      return initialState;
    },
    
    // Workout completion tracking
    completeWorkout: (state, action) => {
      const { workoutId, completionData, difficulty, caloriesBurned, effortRating } = action.payload;
      const completedSession = {
        workoutId,
        completedAt: new Date().toISOString(),
        duration: completionData.duration,
        exercisesCompleted: completionData.exercisesCompleted,
        difficulty,
        caloriesBurned,
        effortRating, // 1-5 scale (1=very easy, 5=very hard)
        averageRestTime: completionData.averageRestTime,
        completionSpeed: completionData.completionSpeed, // vs planned duration
        ...completionData,
      };
      
      state.workoutHistory.unshift(completedSession);
      
      // Update workout stats
      state.workoutStats = {
        ...state.workoutStats,
        totalWorkouts: state.workoutStats.totalWorkouts + 1,
        totalCalories: (state.workoutStats.totalCalories || 0) + caloriesBurned,
        totalDuration: (state.workoutStats.totalDuration || 0) + completionData.duration,
      };
    },
    
    // Update workout difficulty based on performance/feedback
    updateWorkoutDifficulty: (state, action) => {
      const { workoutId, difficultyAdjustment, reason } = action.payload;
      const workout = state.workouts.find(w => w.id === workoutId);
      if (workout) {
        workout.currentDifficulty = (workout.currentDifficulty || 1) + difficultyAdjustment;
        workout.lastAdjustment = {
          date: new Date().toISOString(),
          adjustment: difficultyAdjustment,
          reason, // 'user_feedback', 'completion_speed', 'auto_progression'
        };
      }
    },
    
    // Set workout calendar data
    setWorkoutCalendar: (state, action) => {
      state.workoutCalendar = action.payload;
    },
    
    // Add workout analytics data
    updateWorkoutAnalytics: (state, action) => {
      state.workoutAnalytics = { ...state.workoutAnalytics, ...action.payload };
    },
  },
});

// Export actions
export const {
  setLoading,
  setWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  startWorkout,
  endWorkout,
  updateCurrentWorkout,
  completeSet,
  setWorkoutPlans,
  addWorkoutPlan,
  setActiveWorkoutPlan,
  setWorkoutHistory,
  setTemplates,
  addTemplate,
  setError,
  clearError,
  resetWorkouts,
  completeWorkout,
  updateWorkoutDifficulty,
  setWorkoutCalendar,
  updateWorkoutAnalytics,
} = workoutSlice.actions;

// Selectors
export const selectWorkouts = (state) => state.workout.workouts;
export const selectCurrentWorkout = (state) => state.workout.currentWorkout;
export const selectWorkoutPlans = (state) => state.workout.workoutPlans;
export const selectActiveWorkoutPlan = (state) => state.workout.activeWorkoutPlan;
export const selectWorkoutHistory = (state) => state.workout.workoutHistory;
export const selectTemplates = (state) => state.workout.templates;
export const selectWorkoutLoading = (state) => state.workout.isLoading;
export const selectWorkoutError = (state) => state.workout.error;
export const selectWorkoutStats = (state) => state.workout.workoutStats;
export const selectWorkoutCalendar = (state) => state.workout.workoutCalendar;
export const selectWorkoutAnalytics = (state) => state.workout.workoutAnalytics;

// Export reducer
export default workoutSlice.reducer;
