import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  exercises: [],
  categories: [],
  favorites: [],
  customExercises: [],
  filters: {
    category: 'all',
    difficulty: 'all',
    equipment: 'all',
    muscleGroup: 'all',
  },
  searchQuery: '',
  isLoading: false,
  error: null,
};

// Exercise slice
const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Set exercises
    setExercises: (state, action) => {
      state.exercises = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    // Add exercise
    addExercise: (state, action) => {
      state.exercises.push(action.payload);
    },
    
    // Update exercise
    updateExercise: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.exercises.findIndex(exercise => exercise.id === id);
      if (index !== -1) {
        state.exercises[index] = { ...state.exercises[index], ...updates };
      }
    },
    
    // Delete exercise
    deleteExercise: (state, action) => {
      state.exercises = state.exercises.filter(exercise => exercise.id !== action.payload);
    },
    
    // Set categories
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    
    // Set favorites
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    
    // Add to favorites
    addToFavorites: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    
    // Remove from favorites
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    
    // Set custom exercises
    setCustomExercises: (state, action) => {
      state.customExercises = action.payload;
    },
    
    // Add custom exercise
    addCustomExercise: (state, action) => {
      state.customExercises.push(action.payload);
    },
    
    // Update custom exercise
    updateCustomExercise: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.customExercises.findIndex(exercise => exercise.id === id);
      if (index !== -1) {
        state.customExercises[index] = { ...state.customExercises[index], ...updates };
      }
    },
    
    // Delete custom exercise
    deleteCustomExercise: (state, action) => {
      state.customExercises = state.customExercises.filter(exercise => exercise.id !== action.payload);
    },
    
    // Set filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Set specific filter
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        difficulty: 'all',
        equipment: 'all',
        muscleGroup: 'all',
      };
    },
    
    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    // Clear search
    clearSearch: (state) => {
      state.searchQuery = '';
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
    
    // Reset exercise data
    resetExercises: (state) => {
      return initialState;
    },
  },
});

// Export actions
export const {
  setLoading,
  setExercises,
  addExercise,
  updateExercise,
  deleteExercise,
  setCategories,
  setFavorites,
  addToFavorites,
  removeFromFavorites,
  setCustomExercises,
  addCustomExercise,
  updateCustomExercise,
  deleteCustomExercise,
  setFilters,
  setFilter,
  clearFilters,
  setSearchQuery,
  clearSearch,
  setError,
  clearError,
  resetExercises,
} = exerciseSlice.actions;

// Selectors
export const selectExercises = (state) => state.exercise.exercises;
export const selectCategories = (state) => state.exercise.categories;
export const selectFavorites = (state) => state.exercise.favorites;
export const selectCustomExercises = (state) => state.exercise.customExercises;
export const selectFilters = (state) => state.exercise.filters;
export const selectSearchQuery = (state) => state.exercise.searchQuery;
export const selectExerciseLoading = (state) => state.exercise.isLoading;
export const selectExerciseError = (state) => state.exercise.error;

// Computed selectors
export const selectFilteredExercises = (state) => {
  const { exercises, filters, searchQuery } = state.exercise;
  
  return exercises.filter(exercise => {
    // Search query filter
    if (searchQuery && !exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category !== 'all' && exercise.category !== filters.category) {
      return false;
    }
    
    // Difficulty filter
    if (filters.difficulty !== 'all' && exercise.difficulty !== filters.difficulty) {
      return false;
    }
    
    // Equipment filter
    if (filters.equipment !== 'all' && exercise.equipment !== filters.equipment) {
      return false;
    }
    
    // Muscle group filter
    if (filters.muscleGroup !== 'all' && exercise.muscleGroup !== filters.muscleGroup) {
      return false;
    }
    
    return true;
  });
};

export const selectFavoriteExercises = (state) => {
  const { exercises, favorites } = state.exercise;
  return exercises.filter(exercise => favorites.includes(exercise.id));
};

// Export reducer
export default exerciseSlice.reducer;
