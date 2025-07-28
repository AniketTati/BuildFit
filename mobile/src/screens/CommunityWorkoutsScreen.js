import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addWorkout } from '../store/slices/workoutSlice';
import CommunityWorkoutAPI from '../services/communityWorkoutAPI';

const CommunityWorkoutsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'recent', 'rating'

  // Mock community workouts data (in real app, this would come from API)
  const mockCommunityWorkouts = [
    {
      id: 'community-1',
      name: 'Morning Energy Boost',
      description: 'Quick 10-minute energizing workout to start your day',
      author: 'FitnessPro',
      authorId: 'user-1',
      rating: 4.8,
      totalRatings: 234,
      downloads: 1250,
      duration: 600, // 10 minutes
      difficulty: 'Beginner',
      category: 'Cardio',
      muscleGroups: ['Full Body', 'Cardio'],
      exercises: [
        { id: 1, name: 'Jumping Jacks', type: 'time', duration: 30, restTime: 15 },
        { id: 2, name: 'High Knees', type: 'time', duration: 30, restTime: 15 },
        { id: 3, name: 'Push-ups', type: 'reps', reps: 10, sets: 1, restTime: 30 },
        { id: 4, name: 'Squats', type: 'reps', reps: 15, sets: 1, restTime: 30 },
        { id: 5, name: 'Mountain Climbers', type: 'time', duration: 30, restTime: 15 },
        { id: 6, name: 'Plank', type: 'time', duration: 45, restTime: 0 },
      ],
      tags: ['quick', 'morning', 'energy'],
      createdAt: '2025-01-15T08:00:00Z',
      isPublic: true,
    },
    {
      id: 'community-2',
      name: 'Core Crusher',
      description: 'Intense core workout for building strength and definition',
      author: 'CoreMaster',
      authorId: 'user-2',
      rating: 4.6,
      totalRatings: 189,
      downloads: 892,
      duration: 900, // 15 minutes
      difficulty: 'Intermediate',
      category: 'Core',
      muscleGroups: ['Core', 'Abs'],
      exercises: [
        { id: 1, name: 'Plank', type: 'time', duration: 60, restTime: 30 },
        { id: 2, name: 'Russian Twists', type: 'reps', reps: 20, sets: 2, restTime: 30 },
        { id: 3, name: 'Bicycle Crunches', type: 'reps', reps: 15, sets: 2, restTime: 30 },
        { id: 4, name: 'Dead Bug', type: 'reps', reps: 10, sets: 2, restTime: 30 },
        { id: 5, name: 'Side Plank', type: 'time', duration: 30, restTime: 15 },
        { id: 6, name: 'Mountain Climbers', type: 'time', duration: 45, restTime: 0 },
      ],
      tags: ['core', 'abs', 'strength'],
      createdAt: '2025-01-20T14:30:00Z',
      isPublic: true,
    },
    {
      id: 'community-3',
      name: 'HIIT Power Session',
      description: 'High-intensity interval training for maximum calorie burn',
      author: 'HIITCoach',
      authorId: 'user-3',
      rating: 4.9,
      totalRatings: 456,
      downloads: 2100,
      duration: 1200, // 20 minutes
      difficulty: 'Advanced',
      category: 'HIIT',
      muscleGroups: ['Full Body', 'Cardio'],
      exercises: [
        { id: 1, name: 'Burpees', type: 'reps', reps: 8, sets: 3, restTime: 45 },
        { id: 2, name: 'Jump Squats', type: 'reps', reps: 12, sets: 3, restTime: 45 },
        { id: 3, name: 'Push-up to T', type: 'reps', reps: 6, sets: 3, restTime: 45 },
        { id: 4, name: 'High Knees', type: 'time', duration: 45, restTime: 45 },
        { id: 5, name: 'Mountain Climbers', type: 'time', duration: 45, restTime: 45 },
        { id: 6, name: 'Plank Jacks', type: 'time', duration: 30, restTime: 0 },
      ],
      tags: ['hiit', 'intense', 'calorie-burn'],
      createdAt: '2025-01-25T16:00:00Z',
      isPublic: true,
    },
    {
      id: 'community-4',
      name: 'Yoga Flow for Flexibility',
      description: 'Gentle yoga sequence to improve flexibility and relaxation',
      author: 'YogaMaster',
      authorId: 'user-4',
      rating: 4.7,
      totalRatings: 312,
      downloads: 1560,
      duration: 1800, // 30 minutes
      difficulty: 'Beginner',
      category: 'Flexibility',
      muscleGroups: ['Full Body', 'Mobility'],
      exercises: [
        { id: 1, name: 'Cat-Cow Stretch', type: 'time', duration: 60, restTime: 0 },
        { id: 2, name: 'Downward Dog', type: 'time', duration: 90, restTime: 30 },
        { id: 3, name: 'Child\'s Pose', type: 'time', duration: 60, restTime: 0 },
        { id: 4, name: 'Warrior I', type: 'time', duration: 60, restTime: 30 },
        { id: 5, name: 'Forward Fold', type: 'time', duration: 90, restTime: 30 },
        { id: 6, name: 'Seated Spinal Twist', type: 'time', duration: 60, restTime: 0 },
      ],
      tags: ['yoga', 'flexibility', 'relaxation'],
      createdAt: '2025-01-18T10:15:00Z',
      isPublic: true,
    },
  ];

  const categories = ['All', 'Cardio', 'Strength', 'Core', 'Flexibility', 'HIIT'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    loadCommunityWorkouts();
  }, []);

  useEffect(() => {
    filterWorkouts();
  }, [workouts, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  const loadCommunityWorkouts = async () => {
    try {
      setLoading(true);
      
      // Use real API instead of mock data
      const response = await CommunityWorkoutAPI.getCommunityWorkouts({
        page: 1,
        limit: 50,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        difficulty: selectedDifficulty !== 'All' ? selectedDifficulty.toLowerCase() : undefined,
        sortBy: sortBy,
        search: searchTerm || undefined
      });

      if (response.success) {
        setWorkouts(response.data);
      } else {
        throw new Error(response.message || 'Failed to load workouts');
      }
    } catch (error) {
      console.error('Error loading community workouts:', error);
      
      // Fallback to mock data if API fails
      console.log('Falling back to mock data...');
      setWorkouts(mockCommunityWorkouts);
      
      // Only show error if it's not a network issue (to avoid annoying users during development)
      if (!error.message.includes('Network') && !error.message.includes('fetch')) {
        Alert.alert('Notice', 'Using sample data. Community features will be available when connected to server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCommunityWorkouts();
    setRefreshing(false);
  };

  const filterWorkouts = () => {
    let filtered = [...workouts];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(workout =>
        workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(workout => workout.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(workout => workout.difficulty === selectedDifficulty);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads;
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredWorkouts(filtered);
  };

  const downloadWorkout = async (workout) => {
    try {
      // Try to use API to copy workout if user is authenticated
      if (user?.token) {
        const response = await CommunityWorkoutAPI.copyWorkout(workout.id, user.token);
        if (response.success) {
          dispatch(addWorkout(response.data));
          Alert.alert('Downloaded!', `"${workout.name}" has been added to your workouts.`);
          return;
        }
      }
      
      // Fallback to local copy
      const localWorkout = {
        ...workout,
        id: Date.now(),
        isFromCommunity: true,
        originalId: workout.id,
        downloadedAt: new Date().toISOString(),
        isCustom: true, // Mark as custom so it appears in user's workouts
      };

      dispatch(addWorkout(localWorkout));
      Alert.alert('Downloaded!', `"${workout.name}" has been added to your workouts.`);
    } catch (error) {
      console.error('Error downloading workout:', error);
      
      // Still add locally even if API fails
      const localWorkout = {
        ...workout,
        id: Date.now(),
        isFromCommunity: true,
        originalId: workout.id,
        downloadedAt: new Date().toISOString(),
        isCustom: true,
      };

      dispatch(addWorkout(localWorkout));
      Alert.alert('Downloaded!', `"${workout.name}" has been added to your workouts.`);
    }
  };

  const startWorkout = (workout) => {
    navigation.navigate('WorkoutSession', {
      workoutId: workout.id,
      workout: workout,
    });
  };

  const renderWorkoutCard = ({ item: workout }) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => setSelectedWorkout(workout)}
    >
      <View style={styles.workoutHeader}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.workoutAuthor}>by {workout.author}</Text>
        </View>
        <View style={styles.workoutStats}>
          <View style={styles.statItem}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={styles.statText}>{workout.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="download" size={14} color="#666" />
            <Text style={styles.statText}>{workout.downloads}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.workoutDescription}>{workout.description}</Text>

      <View style={styles.workoutDetails}>
        <View style={styles.detailItem}>
          <Icon name="schedule" size={16} color="#666" />
          <Text style={styles.detailText}>{Math.round(workout.duration / 60)} min</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="fitness-center" size={16} color="#666" />
          <Text style={styles.detailText}>{workout.exercises.length} exercises</Text>
        </View>
        <View style={[styles.difficultyBadge, styles[`difficulty${workout.difficulty}`]]}>
          <Text style={styles.difficultyText}>{workout.difficulty}</Text>
        </View>
      </View>

      <View style={styles.workoutTags}>
        {workout.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const WorkoutDetailModal = () => {
    if (!selectedWorkout) return null;

    return (
      <Modal
        visible={!!selectedWorkout}
        animationType="slide"
        onRequestClose={() => setSelectedWorkout(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedWorkout(null)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedWorkout.name}</Text>
            <View style={styles.modalHeaderRight}>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => downloadWorkout(selectedWorkout)}
              >
                <Icon name="download" size={20} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.workoutMetadata}>
              <Text style={styles.workoutAuthorLarge}>by {selectedWorkout.author}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={20} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {selectedWorkout.rating} ({selectedWorkout.totalRatings} ratings)
                </Text>
              </View>
            </View>

            <Text style={styles.workoutDescriptionLarge}>{selectedWorkout.description}</Text>

            <View style={styles.workoutMetrics}>
              <View style={styles.metricItem}>
                <Icon name="schedule" size={20} color="#666" />
                <Text style={styles.metricText}>{Math.round(selectedWorkout.duration / 60)} minutes</Text>
              </View>
              <View style={styles.metricItem}>
                <Icon name="fitness-center" size={20} color="#666" />
                <Text style={styles.metricText}>{selectedWorkout.exercises.length} exercises</Text>
              </View>
              <View style={styles.metricItem}>
                <Icon name="trending-up" size={20} color="#666" />
                <Text style={styles.metricText}>{selectedWorkout.difficulty}</Text>
              </View>
              <View style={styles.metricItem}>
                <Icon name="download" size={20} color="#666" />
                <Text style={styles.metricText}>{selectedWorkout.downloads} downloads</Text>
              </View>
            </View>

            <View style={styles.muscleGroupsSection}>
              <Text style={styles.sectionTitle}>Targeted Muscle Groups</Text>
              <View style={styles.muscleGroups}>
                {selectedWorkout.muscleGroups.map((group, index) => (
                  <View key={index} style={styles.muscleGroupTag}>
                    <Text style={styles.muscleGroupText}>{group}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.exercisesSection}>
              <Text style={styles.sectionTitle}>Exercises ({selectedWorkout.exercises.length})</Text>
              {selectedWorkout.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseItem}>
                  <Text style={styles.exerciseNumber}>{index + 1}</Text>
                  <View style={styles.exerciseDetails}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseParams}>
                      {exercise.type === 'time'
                        ? `${exercise.duration}s`
                        : `${exercise.sets || 1} sets × ${exercise.reps} reps`
                      }
                      {exercise.restTime > 0 && ` • Rest: ${exercise.restTime}s`}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.tagsSection}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tagsList}>
                {selectedWorkout.tags.map((tag, index) => (
                  <View key={index} style={styles.tagLarge}>
                    <Text style={styles.tagTextLarge}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.downloadActionButton]}
              onPress={() => {
                downloadWorkout(selectedWorkout);
                setSelectedWorkout(null);
              }}
            >
              <Icon name="download" size={20} color="#4CAF50" />
              <Text style={styles.downloadActionText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.startActionButton]}
              onPress={() => {
                startWorkout(selectedWorkout);
                setSelectedWorkout(null);
              }}
            >
              <Icon name="play-arrow" size={20} color="#fff" />
              <Text style={styles.startActionText}>Start Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Workouts</Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <Icon name="filter-list" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search workouts, authors, or tags..."
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm('')}>
              <Icon name="clear" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'popular', label: 'Popular' },
              { key: 'recent', label: 'Recent' },
              { key: 'rating', label: 'Rating' },
            ].map(sort => (
              <TouchableOpacity
                key={sort.key}
                style={[
                  styles.sortChip,
                  sortBy === sort.key && styles.sortChipActive
                ]}
                onPress={() => setSortBy(sort.key)}
              >
                <Text style={[
                  styles.sortChipText,
                  sortBy === sort.key && styles.sortChipTextActive
                ]}>
                  {sort.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterChip,
                    selectedCategory === category && styles.filterChipActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedCategory === category && styles.filterChipTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Difficulty</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {difficulties.map(difficulty => (
                <TouchableOpacity
                  key={difficulty}
                  style={[
                    styles.filterChip,
                    selectedDifficulty === difficulty && styles.filterChipActive
                  ]}
                  onPress={() => setSelectedDifficulty(difficulty)}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedDifficulty === difficulty && styles.filterChipTextActive
                  ]}>
                    {difficulty}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={filteredWorkouts}
        renderItem={renderWorkoutCard}
        keyExtractor={(item) => item.id}
        style={styles.workoutsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.workoutsListContent}
      />

      <WorkoutDetailModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginRight: 10,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  sortChipActive: {
    backgroundColor: '#4CAF50',
  },
  sortChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  sortChipTextActive: {
    color: '#fff',
  },
  filtersContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterSection: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterChipText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  resultsCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  workoutsList: {
    flex: 1,
  },
  workoutsListContent: {
    padding: 20,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  workoutAuthor: {
    fontSize: 12,
    color: '#666',
  },
  workoutStats: {
    alignItems: 'flex-end',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  workoutDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  difficultyBeginner: {
    backgroundColor: '#E8F5E8',
  },
  difficultyIntermediate: {
    backgroundColor: '#FFF3CD',
  },
  difficultyAdvanced: {
    backgroundColor: '#F8D7DA',
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
  workoutTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  modalHeaderRight: {
    width: 24,
  },
  downloadButton: {
    padding: 2,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  workoutMetadata: {
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutAuthorLarge: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  workoutDescriptionLarge: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  workoutMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  muscleGroupsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleGroupTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleGroupText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  exercisesSection: {
    marginBottom: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  exerciseNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    width: 30,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  exerciseParams: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  tagsSection: {
    marginBottom: 20,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagLarge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagTextLarge: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  downloadActionButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  downloadActionText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  startActionButton: {
    backgroundColor: '#4CAF50',
  },
  startActionText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CommunityWorkoutsScreen;
