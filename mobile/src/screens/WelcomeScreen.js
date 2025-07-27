import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

/**
 * Welcome Screen
 * Initial screen for unauthenticated users
 */
const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Brand Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Icon name="fitness-center" size={80} color="#2E86AB" />
          </View>
          <Text style={styles.brandName}>BuildFit</Text>
          <Text style={styles.tagline}>Your Fitness Journey Starts Here</Text>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresSection}>
          <View style={styles.feature}>
            <Icon name="trending-up" size={24} color="#4ECDC4" />
            <Text style={styles.featureText}>Track Progress</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="group" size={24} color="#FF6B6B" />
            <Text style={styles.featureText}>Share Workouts</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="star" size={24} color="#96CEB4" />
            <Text style={styles.featureText}>Achieve Goals</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40,
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontWeight: '500',
  },
  actionSection: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#2E86AB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2E86AB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  secondaryButtonText: {
    color: '#2E86AB',
    fontSize: 16,
    fontWeight: '500',
  },
  termsSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#2E86AB',
    fontWeight: '500',
  },
});

export default WelcomeScreen;
