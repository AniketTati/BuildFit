import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WorkoutScreen from '../screens/WorkoutScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import WorkoutBuilderScreen from '../screens/WorkoutBuilderScreen';
import WorkoutSessionScreen from '../screens/WorkoutSessionScreen';

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
    </Stack.Navigator>
  );
};

export default WorkoutStackNavigator;
