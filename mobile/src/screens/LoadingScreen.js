import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

/**
 * Loading Screen
 * Displayed while checking authentication status
 */
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2E86AB" />
      <Text style={styles.loadingText}>BuildFit</Text>
      <Text style={styles.subText}>Loading your fitness journey...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginTop: 20,
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default LoadingScreen;
