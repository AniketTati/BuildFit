import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  workouts: [],
  currentWorkout: null,
  // Session Management State
  currentSession: null,
  isSessionActive: false,
  isPaused: false,
  currentExerciseIndex: 0,
  sessionStartTime: null,
  totalSessionTime: 0,
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
  currentSession: null,
  isSessionActive: false,
  isPaused: false,
  sessionStartTime: null,
  totalSessionTime: 0,
  currentExerciseIndex: 0,
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

    // Session Management Actions
    startSession: (state, action) => {
      const { workoutId, workout } = action.payload;
      // Use provided workout data or find in state
      const workoutData = workout || state.workouts.find(w => w.id === workoutId);
      if (workoutData) {
        state.currentSession = {
          ...workoutData,
          sessionId: Date.now().toString(),
          startTime: new Date().toISOString(),
          status: 'active',
          isPaused: false,
          totalSessionTime: 0,
        };
        state.currentExerciseIndex = 0;
        state.isSessionActive = true;
        state.isPaused = false;
        state.sessionStartTime = Date.now();
      }
    },

    pauseSession: (state) => {
      if (state.currentSession) {
        state.isPaused = true;
        state.currentSession.pausedAt = new Date().toISOString();
      }
    },

    resumeSession: (state) => {
      if (state.currentSession) {
        state.isPaused = false;
        state.currentSession.resumedAt = new Date().toISOString();
      }
    },

    nextExercise: (state) => {
      if (state.currentSession && state.currentExerciseIndex < state.currentSession.exercises.length - 1) {
        state.currentExerciseIndex += 1;
      }
    },

    previousExercise: (state) => {
      if (state.currentSession && state.currentExerciseIndex > 0) {
        state.currentExerciseIndex -= 1;
      }
    },

    updateSessionTime: (state) => {
      if (state.currentSession && !state.isPaused) {
        const now = Date.now();
        state.totalSessionTime = Math.floor((now - state.sessionStartTime) / 1000);
        state.currentSession.totalSessionTime = state.totalSessionTime;
      }
    },

    setCurrentExercise: (state, action) => {
      state.currentExerciseIndex = action.payload;
    },

    completeSession: (state, action) => {
      const { difficulty, totalTime, exercisesCompleted } = action.payload;
      if (state.currentSession) {
        const completedSession = {
          ...state.currentSession,
          endTime: new Date().toISOString(),
          status: 'completed',
          difficulty,
          totalTime,
          exercisesCompleted,
          caloriesBurned: Math.round(totalTime * 0.1), // Simple estimation
        };
        
        state.workoutHistory.unshift(completedSession);
        state.currentSession = null;
        state.isSessionActive = false;
        state.isPaused = false;
        state.currentExerciseIndex = 0;
        state.totalSessionTime = 0;
        
        // Update stats
        state.workoutStats = {
          ...state.workoutStats,
          totalWorkouts: state.workoutStats.totalWorkouts + 1,
          totalCalories: (state.workoutStats.totalCalories || 0) + Math.round(totalTime * 0.1),
          totalDuration: (state.workoutStats.totalDuration || 0) + totalTime,
        };
      }
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
  // Session Management Actions
  startSession,
  pauseSession,
  resumeSession,
  nextExercise,
  previousExercise,
  updateSessionTime,
  setCurrentExercise,
  completeSession,
  // ...existing code...
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
export const selectCurrentSession = (state) => state.workout.currentSession;
export const selectIsSessionActive = (state) => state.workout.isSessionActive;
export const selectIsPaused = (state) => state.workout.isPaused;
export const selectSessionStartTime = (state) => state.workout.sessionStartTime;
export const selectTotalSessionTime = (state) => state.workout.totalSessionTime;
export const selectCurrentExerciseIndex = (state) => state.workout.currentExerciseIndex;

// Export reducer
export default workoutSlice.reducer;
