import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

/**
 * Progress Screen
 * Displays user's fitness progress with charts and statistics
 */
const ProgressScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  
  const periods = ['Week', 'Month', '3 Months', 'Year'];

  const stats = [
    {
      id: 1,
      title: 'Workouts Completed',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: 'fitness-center',
      color: '#FF6B6B',
    },
    {
      id: 2,
      title: 'Total Weight Lifted',
      value: '2,450 lbs',
      change: '+150 lbs',
      changeType: 'positive',
      icon: 'trending-up',
      color: '#4ECDC4',
    },
    {
      id: 3,
      title: 'Avg Workout Time',
      value: '48 min',
      change: '+5 min',
      changeType: 'positive',
      icon: 'timer',
      color: '#45B7D1',
    },
    {
      id: 4,
      title: 'Current Streak',
      value: '7 days',
      change: '+2 days',
      changeType: 'positive',
      icon: 'local-fire-department',
      color: '#96CEB4',
    },
  ];

  const progressData = [
    { exercise: 'Bench Press', current: '185 lbs', previous: '175 lbs', change: '+10 lbs' },
    { exercise: 'Squat', current: '225 lbs', previous: '215 lbs', change: '+10 lbs' },
    { exercise: 'Deadlift', current: '275 lbs', previous: '265 lbs', change: '+10 lbs' },
    { exercise: 'Overhead Press', current: '135 lbs', previous: '130 lbs', change: '+5 lbs' },
  ];

  const achievements = [
    { id: 1, title: 'First Workout', description: 'Complete your first workout', earned: true },
    { id: 2, title: 'Week Warrior', description: 'Complete 7 workouts in a week', earned: true },
    { id: 3, title: 'Consistency King', description: '30-day workout streak', earned: false },
    { id: 4, title: 'Heavy Lifter', description: 'Lift 1000 lbs total in one workout', earned: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progress</Text>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => navigation.navigate('ShareProgress')}
          >
            <Icon name="share" size={24} color="#2E86AB" />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.periodContent}
          >
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodChip,
                  selectedPeriod === period && styles.periodChipActive
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period && styles.periodTextActive
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                  <Icon name={stat.icon} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <View style={styles.statChange}>
                  <Icon 
                    name={stat.changeType === 'positive' ? 'trending-up' : 'trending-down'} 
                    size={16} 
                    color={stat.changeType === 'positive' ? '#4CAF50' : '#F44336'} 
                  />
                  <Text style={[
                    styles.statChangeText,
                    { color: stat.changeType === 'positive' ? '#4CAF50' : '#F44336' }
                  ]}>
                    {stat.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Progress Chart Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Frequency</Text>
          <View style={styles.chartPlaceholder}>
            <Icon name="insert-chart" size={48} color="#999" />
            <Text style={styles.chartPlaceholderText}>Chart will be displayed here</Text>
            <Text style={styles.chartPlaceholderSubtext}>
              Weekly workout frequency for the selected period
            </Text>
          </View>
        </View>

        {/* Personal Records */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Records</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllRecords')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {progressData.map((record, index) => (
            <View key={index} style={styles.recordCard}>
              <View style={styles.recordInfo}>
                <Text style={styles.recordExercise}>{record.exercise}</Text>
                <Text style={styles.recordWeight}>{record.current}</Text>
              </View>
              <View style={styles.recordChange}>
                <Text style={styles.recordPrevious}>Previous: {record.previous}</Text>
                <View style={styles.recordImprovement}>
                  <Icon name="trending-up" size={16} color="#4CAF50" />
                  <Text style={styles.recordChangeText}>{record.change}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllAchievements')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.slice(0, 4).map((achievement) => (
              <View key={achievement.id} style={[
                styles.achievementCard,
                !achievement.earned && styles.achievementCardLocked
              ]}>
                <Icon 
                  name={achievement.earned ? 'stars' : 'star-border'} 
                  size={32} 
                  color={achievement.earned ? '#FFD700' : '#999'} 
                />
                <Text style={[
                  styles.achievementTitle,
                  !achievement.earned && styles.achievementTitleLocked
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.earned && styles.achievementDescriptionLocked
                ]}>
                  {achievement.description}
                </Text>
              </View>
            ))}
          </View>
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
  shareButton: {
    padding: 8,
  },
  periodContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  periodContent: {
    paddingHorizontal: 20,
  },
  periodChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 10,
  },
  periodChipActive: {
    backgroundColor: '#2E86AB',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  seeAllText: {
    fontSize: 16,
    color: '#2E86AB',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 50) / 2,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statChangeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  chartPlaceholder: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 12,
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
  chartPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 12,
    marginBottom: 4,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recordInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordExercise: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  recordWeight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E86AB',
  },
  recordChange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordPrevious: {
    fontSize: 14,
    color: '#666',
  },
  recordImprovement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordChangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 4,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 50) / 2,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#999',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementDescriptionLocked: {
    color: '#999',
  },
});

export default ProgressScreen;
