import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';

const WorkoutCompleteScreen = ({ route, navigation }) => {
  const { sessionData } = route.params;
  const dispatch = useDispatch();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'perfect': return '#2196F3';
      case 'hard': return '#FF5722';
      default: return '#666';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Too Easy';
      case 'perfect': return 'Just Right';
      case 'hard': return 'Too Hard';
      default: return 'Unknown';
    }
  };

  const estimatedCalories = Math.round(sessionData.totalTime * 0.1); // Simple estimation

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleViewProgress = () => {
    navigation.navigate('Progress');
  };

  const handleShareWorkout = () => {
    // TODO: Implement sharing functionality
    console.log('Share workout');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <Text style={styles.successIcon}>🎉</Text>
          <Text style={styles.successTitle}>Workout Complete!</Text>
          <Text style={styles.successSubtitle}>Great job finishing your workout</Text>
        </View>

        {/* Workout Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Workout Summary</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatTime(sessionData.totalTime)}</Text>
              <Text style={styles.statLabel}>Total Time</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{sessionData.exercisesCompleted}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{estimatedCalories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text 
                style={[
                  styles.statValue, 
                  { color: getDifficultyColor(sessionData.difficulty) }
                ]}
              >
                {getDifficultyText(sessionData.difficulty)}
              </Text>
              <Text style={styles.statLabel}>Difficulty</Text>
            </View>
          </View>
        </View>

        {/* Achievement Section */}
        <View style={styles.achievementContainer}>
          <Text style={styles.sectionTitle}>Today's Achievement</Text>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>💪</Text>
            <Text style={styles.achievementText}>
              You completed a full workout and burned approximately {estimatedCalories} calories!
            </Text>
          </View>
        </View>

        {/* Progress Insight */}
        {sessionData.difficulty === 'easy' && (
          <View style={styles.insightContainer}>
            <Text style={styles.sectionTitle}>Progress Insight</Text>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>📈</Text>
              <Text style={styles.insightText}>
                Since you found this workout easy, we'll increase the difficulty for your next session!
              </Text>
            </View>
          </View>
        )}

        {sessionData.difficulty === 'hard' && (
          <View style={styles.insightContainer}>
            <Text style={styles.sectionTitle}>Progress Insight</Text>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>🎯</Text>
              <Text style={styles.insightText}>
                Great effort! We'll adjust the next workout to better match your current fitness level.
              </Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]} 
            onPress={handleBackToHome}
          >
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]} 
            onPress={handleViewProgress}
          >
            <Text style={styles.secondaryButtonText}>View Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]} 
            onPress={handleShareWorkout}
          >
            <Text style={styles.secondaryButtonText}>Share Achievement</Text>
          </TouchableOpacity>
        </View>

        {/* Motivation Quote */}
        <View style={styles.motivationContainer}>
          <Text style={styles.motivationQuote}>
            "The only bad workout is the one that didn't happen."
          </Text>
          <Text style={styles.motivationAuthor}>- Unknown</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  successIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  achievementContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 10,
    padding: 15,
  },
  achievementIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  achievementText: {
    flex: 1,
    fontSize: 16,
    color: '#2E7D32',
    lineHeight: 22,
  },
  insightContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 15,
  },
  insightIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  insightText: {
    flex: 1,
    fontSize: 16,
    color: '#1565C0',
    lineHeight: 22,
  },
  actionContainer: {
    marginBottom: 30,
  },
  actionButton: {
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  motivationContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  motivationQuote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  motivationAuthor: {
    fontSize: 14,
    color: '#999',
  },
});

export default WorkoutCompleteScreen;
