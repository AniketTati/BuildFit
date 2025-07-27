import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

/**
 * Root Navigator
 * Handles the main navigation flow based on authentication state
 */
const RootNavigator = () => {
  // Get authentication state from Redux store
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Show loading screen while checking authentication status
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {isAuthenticated ? (
          // User is authenticated - show main app
          <Stack.Screen 
            name="App" 
            component={AppNavigator}
            options={{
              animationTypeForReplace: 'push',
            }}
          />
        ) : (
          // User is not authenticated - show auth screens
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
