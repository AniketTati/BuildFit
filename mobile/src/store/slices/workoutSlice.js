import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  workouts: [],
  currentWorkout: null,
  workoutPlans: [],
  activeWorkoutPlan: null,
  workoutHistory: [],
  templates: [],
  isLoading: false,
  error: null,
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

// Export reducer
export default workoutSlice.reducer;
