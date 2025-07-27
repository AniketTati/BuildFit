import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WorkoutScreen from '../screens/WorkoutScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import WorkoutBuilderScreen from '../screens/WorkoutBuilderScreen';
import WorkoutSessionScreen from '../screens/WorkoutSessionScreen';
import WorkoutCompleteScreen from '../screens/WorkoutCompleteScreen';

const Stack = createStackNavigator();

/**
 * Workout Stack Navigator
 * Handles navigation within the Workouts tab
 */
const WorkoutStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WorkoutList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E86AB',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: { backgroundColor: '#F8F9FA' },
      }}
    >
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutScreen}
        options={{
          title: 'My Workouts',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={({ route }) => ({
          title: route.params?.workoutName || 'Workout Details',
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="WorkoutBuilder"
        component={WorkoutBuilderScreen}
        options={{
          title: 'Create Workout',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="WorkoutSession"
        component={WorkoutSessionScreen}
        options={{
          title: 'Workout Session',
          headerShown: true,
          gestureEnabled: false, // Prevent accidental navigation during workout
        }}
      />
      <Stack.Screen
        name="WorkoutComplete"
        component={WorkoutCompleteScreen}
        options={{
          title: 'Workout Complete',
          headerShown: true,
          gestureEnabled: false, // Prevent accidental back navigation
          headerLeft: null, // Remove back button to force user to use app buttons
        }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutStackNavigator;
