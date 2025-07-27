import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import workoutSlice from './slices/workoutSlice';
import exerciseSlice from './slices/exerciseSlice';
import progressSlice from './slices/progressSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user'], // Only persist auth and user data
};

// Root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  workout: workoutSlice,
  exercise: exerciseSlice,
  progress: progressSlice,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: __DEV__, // Enable Redux DevTools in development
});

// Persistor
export const persistor = persistStore(store);

// Type helpers for TypeScript users (if converted to .ts later)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
