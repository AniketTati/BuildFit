import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ExerciseScreen from '../screens/ExerciseScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import ExerciseSearchScreen from '../screens/ExerciseSearchScreen';
import CreateExerciseScreen from '../screens/CreateExerciseScreen';

const Stack = createStackNavigator();

/**
 * Exercise Stack Navigator
 * Handles navigation within the Exercises tab
 */
const ExerciseStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExerciseList"
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
        name="ExerciseList"
        component={ExerciseScreen}
        options={{
          title: 'Exercise Library',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={({ route }) => ({
          title: route.params?.exerciseName || 'Exercise Details',
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="ExerciseSearch"
        component={ExerciseSearchScreen}
        options={{
          title: 'Search Exercises',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CreateExercise"
        component={CreateExerciseScreen}
        options={{
          title: 'Create Exercise',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ExerciseStackNavigator;
