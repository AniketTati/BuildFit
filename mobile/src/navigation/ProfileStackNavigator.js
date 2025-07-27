import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import ProfileScreen from '../screens/ProfileScreen';
// TODO: Import additional profile-related screens when created
// import EditProfileScreen from '../screens/EditProfileScreen';
// import PersonalInfoScreen from '../screens/PersonalInfoScreen';
// import WorkoutPreferencesScreen from '../screens/WorkoutPreferencesScreen';
// import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
// import PrivacySecurityScreen from '../screens/PrivacySecurityScreen';
// import DataStorageScreen from '../screens/DataStorageScreen';
// import HelpSupportScreen from '../screens/HelpSupportScreen';
// import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

/**
 * Profile Stack Navigator
 * Handles navigation within the Profile tab
 */
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}
    >
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      
      {/* TODO: Add additional profile screens when implemented
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="PersonalInfo" 
        component={PersonalInfoScreen}
        options={{
          title: 'Personal Information',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="WorkoutPreferences" 
        component={WorkoutPreferencesScreen}
        options={{
          title: 'Workout Preferences',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="NotificationSettings" 
        component={NotificationSettingsScreen}
        options={{
          title: 'Notifications',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="PrivacySecurity" 
        component={PrivacySecurityScreen}
        options={{
          title: 'Privacy & Security',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="DataStorage" 
        component={DataStorageScreen}
        options={{
          title: 'Data & Storage',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="HelpSupport" 
        component={HelpSupportScreen}
        options={{
          title: 'Help & Support',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen}
        options={{
          title: 'About BuildFit',
          headerShown: true,
        }}
      />
      */}
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
