import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProgressScreen from '../screens/ProgressScreen';
import ProgressDetailScreen from '../screens/ProgressDetailScreen';
import ProgressChartsScreen from '../screens/ProgressChartsScreen';
import MeasurementsScreen from '../screens/MeasurementsScreen';

const Stack = createStackNavigator();

/**
 * Progress Stack Navigator
 * Handles navigation within the Progress tab
 */
const ProgressStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProgressOverview"
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
        name="ProgressOverview"
        component={ProgressScreen}
        options={{
          title: 'Progress',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ProgressDetail"
        component={ProgressDetailScreen}
        options={({ route }) => ({
          title: route.params?.exerciseName || 'Progress Details',
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="ProgressCharts"
        component={ProgressChartsScreen}
        options={{
          title: 'Charts & Analytics',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Measurements"
        component={MeasurementsScreen}
        options={{
          title: 'Body Measurements',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProgressStackNavigator;
