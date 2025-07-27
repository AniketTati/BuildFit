import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * Workout Screen
 * Displays workout lists, plans, and workout creation options
 */
const WorkoutScreen = ({ navigation }) => {
  const workoutPlans = [
    { id: 1, name: 'Push Pull Legs', exercises: 12, duration: '6 weeks' },
    { id: 2, name: 'Upper Lower Split', exercises: 8, duration: '4 weeks' },
    { id: 3, name: 'Full Body', exercises: 6, duration: '3 weeks' },
  ];

  const recentWorkouts = [
    { id: 1, name: 'Push Day', date: 'Today', duration: '45 min', completed: true },
    { id: 2, name: 'Leg Day', date: 'Yesterday', duration: '60 min', completed: true },
    { id: 3, name: 'Pull Day', date: '2 days ago', duration: '50 min', completed: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Workouts</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateWorkout')}
          >
            <Icon name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: '#FF6B6B' }]}
              onPress={() => navigation.navigate('StartWorkout')}
            >
              <Icon name="play-arrow" size={32} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Start Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: '#4ECDC4' }]}
              onPress={() => navigation.navigate('CreateWorkout')}
            >
              <Icon name="add" size={32} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Create Plan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Workout Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Plans</Text>
          {workoutPlans.map((plan) => (
            <TouchableOpacity 
              key={plan.id} 
              style={styles.planCard}
              onPress={() => navigation.navigate('WorkoutPlan', { planId: plan.id })}
            >
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planDetails}>
                  {plan.exercises} exercises • {plan.duration}
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          {recentWorkouts.map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              style={styles.workoutCard}
              onPress={() => navigation.navigate('WorkoutDetails', { workoutId: workout.id })}
            >
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutMeta}>
                  {workout.date} • {workout.duration}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                {workout.completed && (
                  <Icon name="check-circle" size={20} color="#4CAF50" />
                )}
                <Icon name="chevron-right" size={20} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  addButton: {
    backgroundColor: '#2E86AB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 0.48,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  planDetails: {
    fontSize: 14,
    color: '#666',
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  workoutMeta: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default WorkoutScreen;
