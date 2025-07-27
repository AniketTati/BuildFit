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
  const sampleWorkouts = [
    {
      id: 1,
      name: 'Quick Morning Routine',
      description: 'A 10-minute energizing workout to start your day',
      duration: 600, // 10 minutes in seconds
      exercises: [
        {
          id: 1,
          name: 'Jumping Jacks',
          duration: 30,
          restTime: 30,
          instructions: 'Stand with feet together, jump while raising arms overhead',
        },
        {
          id: 2,
          name: 'Push-ups',
          reps: 10,
          sets: 1,
          restTime: 30,
          instructions: 'Keep your body straight, lower chest to ground',
        },
        {
          id: 3,
          name: 'High Knees',
          duration: 30,
          restTime: 30,
          instructions: 'Run in place, bringing knees up to waist level',
        },
        {
          id: 4,
          name: 'Plank',
          duration: 45,
          restTime: 30,
          instructions: 'Hold your body straight in plank position',
        },
        {
          id: 5,
          name: 'Squats',
          reps: 15,
          sets: 1,
          restTime: 0,
          instructions: 'Feet shoulder-width apart, lower hips back and down',
        },
      ],
    },
    {
      id: 2,
      name: 'Core Crusher',
      description: 'Intensive 15-minute core workout',
      duration: 900, // 15 minutes
      exercises: [
        {
          id: 1,
          name: 'Plank',
          duration: 60,
          restTime: 30,
          instructions: 'Hold plank position, keep core tight',
        },
        {
          id: 2,
          name: 'Mountain Climbers',
          duration: 45,
          restTime: 30,
          instructions: 'Alternate bringing knees to chest in plank position',
        },
        {
          id: 3,
          name: 'Russian Twists',
          reps: 20,
          sets: 1,
          restTime: 30,
          instructions: 'Sit with knees bent, rotate torso side to side',
        },
        {
          id: 4,
          name: 'Dead Bug',
          reps: 10,
          sets: 2,
          restTime: 30,
          instructions: 'Lie on back, slowly extend opposite arm and leg',
        },
        {
          id: 5,
          name: 'Bicycle Crunches',
          reps: 20,
          sets: 1,
          restTime: 0,
          instructions: 'Alternate bringing elbow to opposite knee',
        },
      ],
    },
    {
      id: 3,
      name: 'Full Body HIIT',
      description: 'High intensity 20-minute full body workout',
      duration: 1200, // 20 minutes
      exercises: [
        {
          id: 1,
          name: 'Burpees',
          reps: 8,
          sets: 1,
          restTime: 45,
          instructions: 'Squat, jump back to plank, jump forward, jump up',
        },
        {
          id: 2,
          name: 'Jump Squats',
          reps: 12,
          sets: 1,
          restTime: 45,
          instructions: 'Squat down, explode up into a jump',
        },
        {
          id: 3,
          name: 'Push-up to T',
          reps: 8,
          sets: 1,
          restTime: 45,
          instructions: 'Push-up, rotate into side plank alternating sides',
        },
        {
          id: 4,
          name: 'Lunge Jumps',
          reps: 10,
          sets: 1,
          restTime: 45,
          instructions: 'Lunge position, jump and switch legs mid-air',
        },
        {
          id: 5,
          name: 'Plank Jacks',
          duration: 30,
          restTime: 0,
          instructions: 'In plank position, jump feet apart and together',
        },
      ],
    },
  ];

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

  const startWorkout = (workout) => {
    navigation.navigate('WorkoutSession', { 
      workoutId: workout.id,
      workout: workout 
    });
  };

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

        {/* Sample Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ready to Go Workouts</Text>
          {sampleWorkouts.map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              style={styles.workoutCard}
              onPress={() => startWorkout(workout)}
            >
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDescription}>{workout.description}</Text>
                <Text style={styles.workoutMeta}>
                  {workout.exercises.length} exercises • {Math.round(workout.duration / 60)} min
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => startWorkout(workout)}
              >
                <Icon name="play-arrow" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
  workoutDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  workoutMeta: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default WorkoutScreen;
