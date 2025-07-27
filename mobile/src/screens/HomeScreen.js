import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const quickActions = [
    { id: 1, title: 'Start Workout', icon: '💪', color: '#FF6B6B' },
    { id: 2, title: 'Create Plan', icon: '📝', color: '#4ECDC4' },
    { id: 3, title: 'View Progress', icon: '📊', color: '#45B7D1' },
    { id: 4, title: 'Community', icon: '👥', color: '#96CEB4' },
  ];

  const recentWorkouts = [
    { id: 1, name: 'Push Day', date: 'Today', duration: '45 min' },
    { id: 2, name: 'Leg Day', date: 'Yesterday', duration: '60 min' },
    { id: 3, name: 'Pull Day', date: '2 days ago', duration: '50 min' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={styles.username}>Ready for your workout?</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickAction, { backgroundColor: action.color }]}
              onPress={() => {
                // Navigation logic will be implemented later
                console.log(`Pressed ${action.title}`);
              }}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today's Plan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Plan</Text>
        <View style={styles.todaysPlan}>
          <Text style={styles.planTitle}>Upper Body Strength</Text>
          <Text style={styles.planDetails}>6 exercises • 45 min • Intermediate</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Workouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        {recentWorkouts.map((workout) => (
          <View key={workout.id} style={styles.workoutItem}>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutMeta}>{workout.date} • {workout.duration}</Text>
            </View>
            <TouchableOpacity style={styles.workoutAction}>
              <Text style={styles.workoutActionText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Progress Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.progressOverview}>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>4</Text>
            <Text style={styles.progressLabel}>Workouts</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>3.2h</Text>
            <Text style={styles.progressLabel}>Total Time</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>1,240</Text>
            <Text style={styles.progressLabel}>Calories</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#6C757D',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (width - 60) / 2,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  todaysPlan: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  planDetails: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#2E86AB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  workoutMeta: {
    fontSize: 14,
    color: '#6C757D',
  },
  workoutAction: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
  },
  workoutActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2E86AB',
  },
  progressOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6C757D',
  },
});

export default HomeScreen;
