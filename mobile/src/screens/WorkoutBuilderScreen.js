import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
  Switch,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addWorkout } from '../store/slices/workoutSlice';
import { exerciseDatabase } from '../data/exerciseDatabase';
import WorkoutTemplateManager from '../components/WorkoutTemplateManager';
import CustomExerciseModal from '../components/CustomExerciseModal';

const WorkoutBuilderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [exercises, setExercises] = useState([]);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [showCustomExerciseModal, setShowCustomExerciseModal] = useState(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState(null);

  // Get all available categories from the exercise database
  const getCategories = () => {
    const categories = ['All'];
    const uniqueCategories = [...new Set(exerciseDatabase.map(exercise => exercise.category))];
    return [...categories, ...uniqueCategories.sort()];
  };

  // Get all available equipment options
  const getEquipmentOptions = () => {
    const equipment = ['All'];
    const uniqueEquipment = [...new Set(exerciseDatabase.map(exercise => exercise.equipment))];
    return [...equipment, ...uniqueEquipment.sort()];
  };

  // Get all difficulty levels
  const getDifficultyLevels = () => {
    const levels = ['All'];
    const uniqueLevels = [...new Set(exerciseDatabase.map(exercise => exercise.difficulty))];
    return [...levels, ...uniqueLevels.sort()];
  };

  const addExercise = (selectedExercise) => {
    const newExercise = {
      id: Date.now(),
      name: selectedExercise.name,
      type: selectedExercise.type,
      instructions: selectedExercise.instructions,
      muscleGroups: selectedExercise.muscleGroups,
      category: selectedExercise.category,
      equipment: selectedExercise.equipment,
      difficulty: selectedExercise.difficulty,
      tips: selectedExercise.tips,
      ...(selectedExercise.type === 'time' 
        ? { duration: selectedExercise.defaultDuration }
        : { reps: selectedExercise.defaultReps, sets: selectedExercise.defaultSets }
      ),
      restTime: 30, // Default rest time
    };
    
    setExercises([...exercises, newExercise]);
    setShowExercisePicker(false);
  };

  const updateExercise = (index, updatedExercise) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], ...updatedExercise };
    setExercises(updatedExercises);
  };

  const removeExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const moveExercise = (fromIndex, toIndex) => {
    const updatedExercises = [...exercises];
    const [removed] = updatedExercises.splice(fromIndex, 1);
    updatedExercises.splice(toIndex, 0, removed);
    setExercises(updatedExercises);
  };

  const loadTemplate = (template) => {
    setWorkoutName(template.name);
    setWorkoutDescription(template.description || '');
    setExercises(template.exercises || []);
    Alert.alert('Template Loaded', `"${template.name}" has been loaded successfully!`);
  };

  const getCurrentWorkout = () => ({
    name: workoutName,
    description: workoutDescription,
    exercises: exercises,
  });

  const handleCustomExercise = (customExercise) => {
    // Add the custom exercise to the workout
    addExercise(customExercise);
  };

  const calculateTotalTime = () => {
    return exercises.reduce((total, exercise) => {
      const exerciseTime = exercise.type === 'time' 
        ? exercise.duration 
        : (exercise.sets || 1) * 30; // Estimate 30 seconds per set for rep-based exercises
      return total + exerciseTime + exercise.restTime;
    }, 0);
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }

    if (exercises.length === 0) {
      Alert.alert('Error', 'Please add at least one exercise');
      return;
    }

    const newWorkout = {
      id: Date.now(),
      name: workoutName.trim(),
      description: workoutDescription.trim() || `Custom workout with ${exercises.length} exercises`,
      exercises,
      duration: calculateTotalTime(),
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    dispatch(addWorkout(newWorkout));
    
    Alert.alert(
      'Workout Saved!',
      'Your custom workout has been saved successfully.',
      [
        {
          text: 'Create Another',
          onPress: () => {
            setWorkoutName('');
            setWorkoutDescription('');
            setExercises([]);
          },
        },
        {
          text: 'Back to Workouts',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const previewWorkout = () => {
    if (exercises.length === 0) {
      Alert.alert('Error', 'Please add at least one exercise to preview');
      return;
    }

    const previewWorkout = {
      id: 'preview',
      name: workoutName || 'Preview Workout',
      description: 'Workout preview',
      exercises,
      duration: calculateTotalTime(),
    };

    navigation.navigate('WorkoutSession', { 
      workoutId: 'preview',
      workout: previewWorkout 
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Workout</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={() => setShowTemplateManager(true)}
            style={styles.templateButton}
          >
            <Icon name="bookmark" size={20} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveWorkout} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Workout Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Workout Name *</Text>
            <TextInput
              style={styles.textInput}
              value={workoutName}
              onChangeText={setWorkoutName}
              placeholder="e.g., Morning Energy Boost"
              maxLength={50}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={workoutDescription}
              onChangeText={setWorkoutDescription}
              placeholder="Brief description of your workout..."
              multiline
              numberOfLines={3}
              maxLength={200}
            />
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{exercises.length}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.round(calculateTotalTime() / 60)}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>
        </View>

        {/* Exercises */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <View style={styles.addButtonsContainer}>
              <TouchableOpacity 
                style={[styles.addButton, styles.addButtonSecondary]}
                onPress={() => setShowCustomExerciseModal(true)}
              >
                <Icon name="create" size={18} color="#4CAF50" />
                <Text style={styles.addButtonSecondaryText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => setShowExercisePicker(true)}
              >
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Add Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>

          {exercises.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="fitness-center" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>No exercises added yet</Text>
              <Text style={styles.emptyStateSubtext}>Add existing exercises or create custom ones</Text>
            </View>
          ) : (
            exercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                index={index}
                onUpdate={(updatedExercise) => updateExercise(index, updatedExercise)}
                onRemove={() => removeExercise(index)}
                onMoveUp={() => index > 0 && moveExercise(index, index - 1)}
                onMoveDown={() => index < exercises.length - 1 && moveExercise(index, index + 1)}
                showMoveUp={index > 0}
                showMoveDown={index < exercises.length - 1}
              />
            ))
          )}
        </View>

        {/* Action Buttons */}
        {exercises.length > 0 && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.previewButton]}
              onPress={previewWorkout}
            >
              <Icon name="play-arrow" size={20} color="#2196F3" />
              <Text style={styles.previewButtonText}>Preview Workout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Exercise Picker Modal */}
      <ExercisePickerModal
        visible={showExercisePicker}
        exercises={exerciseDatabase}
        onSelect={addExercise}
        onClose={() => setShowExercisePicker(false)}
      />

      {/* Workout Template Manager */}
      <WorkoutTemplateManager
        visible={showTemplateManager}
        onClose={() => setShowTemplateManager(false)}
        onSelectTemplate={loadTemplate}
        currentWorkout={getCurrentWorkout()}
        onSaveTemplate={() => {
          // Handle successful template save if needed
        }}
      />

      {/* Custom Exercise Modal */}
      <CustomExerciseModal
        visible={showCustomExerciseModal}
        onClose={() => setShowCustomExerciseModal(false)}
        onSave={handleCustomExercise}
      />
    </View>
  );
};

// Exercise Card Component
const ExerciseCard = ({ 
  exercise, 
  index, 
  onUpdate, 
  onRemove, 
  onMoveUp, 
  onMoveDown, 
  showMoveUp, 
  showMoveDown 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValues, setTempValues] = useState({
    duration: exercise.duration || '',
    reps: exercise.reps || '',
    sets: exercise.sets || 1,
    restTime: exercise.restTime || 30,
  });

  const saveChanges = () => {
    const updates = {};
    if (exercise.type === 'time') {
      updates.duration = parseInt(tempValues.duration) || exercise.duration;
    } else {
      updates.reps = parseInt(tempValues.reps) || exercise.reps;
      updates.sets = parseInt(tempValues.sets) || exercise.sets;
    }
    updates.restTime = parseInt(tempValues.restTime) || exercise.restTime;
    
    onUpdate(updates);
    setIsEditing(false);
  };

  return (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseNumber}>{index + 1}</Text>
          <View>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>
              {exercise.type === 'time' 
                ? `${exercise.duration}s`
                : `${exercise.sets} sets × ${exercise.reps} reps`
              } • Rest: {exercise.restTime}s
            </Text>
          </View>
        </View>
        
        <View style={styles.exerciseActions}>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Icon name="edit" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRemove} style={styles.actionSpacing}>
            <Icon name="delete" size={20} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.exerciseControls}>
        <View style={styles.moveButtons}>
          <TouchableOpacity 
            onPress={onMoveUp} 
            disabled={!showMoveUp}
            style={[styles.moveButton, !showMoveUp && styles.moveButtonDisabled]}
          >
            <Icon name="keyboard-arrow-up" size={20} color={showMoveUp ? "#666" : "#ccc"} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onMoveDown} 
            disabled={!showMoveDown}
            style={[styles.moveButton, !showMoveDown && styles.moveButtonDisabled]}
          >
            <Icon name="keyboard-arrow-down" size={20} color={showMoveDown ? "#666" : "#ccc"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isEditing}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <Text style={styles.editModalTitle}>Edit {exercise.name}</Text>
            
            {exercise.type === 'time' ? (
              <View style={styles.editRow}>
                <Text style={styles.editLabel}>Duration (seconds)</Text>
                <TextInput
                  style={styles.editInput}
                  value={tempValues.duration.toString()}
                  onChangeText={(value) => setTempValues({...tempValues, duration: value})}
                  keyboardType="numeric"
                  selectTextOnFocus
                />
              </View>
            ) : (
              <>
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>Reps</Text>
                  <TextInput
                    style={styles.editInput}
                    value={tempValues.reps.toString()}
                    onChangeText={(value) => setTempValues({...tempValues, reps: value})}
                    keyboardType="numeric"
                    selectTextOnFocus
                  />
                </View>
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>Sets</Text>
                  <TextInput
                    style={styles.editInput}
                    value={tempValues.sets.toString()}
                    onChangeText={(value) => setTempValues({...tempValues, sets: value})}
                    keyboardType="numeric"
                    selectTextOnFocus
                  />
                </View>
              </>
            )}
            
            <View style={styles.editRow}>
              <Text style={styles.editLabel}>Rest Time (seconds)</Text>
              <TextInput
                style={styles.editInput}
                value={tempValues.restTime.toString()}
                onChangeText={(value) => setTempValues({...tempValues, restTime: value})}
                keyboardType="numeric"
                selectTextOnFocus
              />
            </View>

            <View style={styles.editButtons}>
              <TouchableOpacity 
                style={[styles.editButton, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.editButton, styles.saveEditButton]}
                onPress={saveChanges}
              >
                <Text style={styles.saveEditButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Exercise Picker Modal Component
const ExercisePickerModal = ({ visible, exercises, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Get unique values for filters
  const categories = ['All', ...new Set(exercises.map(ex => ex.category))].sort();
  const equipmentOptions = ['All', ...new Set(exercises.map(ex => ex.equipment))].sort();
  const difficultyLevels = ['All', ...new Set(exercises.map(ex => ex.difficulty))].sort();
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroups.some(group => 
                           group.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesEquipment = selectedEquipment === 'All' || exercise.equipment === selectedEquipment;
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesEquipment && matchesDifficulty;
  });

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedEquipment('All');
    setSelectedDifficulty('All');
    setSearchTerm('');
  };

  const renderExerciseDetails = (exercise) => (
    <Modal
      visible={!!selectedExercise}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setSelectedExercise(null)}
    >
      <View style={styles.exerciseDetailOverlay}>
        <View style={styles.exerciseDetailModal}>
          <View style={styles.exerciseDetailHeader}>
            <Text style={styles.exerciseDetailTitle}>{exercise?.name}</Text>
            <TouchableOpacity onPress={() => setSelectedExercise(null)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.exerciseDetailContent}>
            <View style={styles.exerciseDetailSection}>
              <Text style={styles.exerciseDetailLabel}>Category</Text>
              <Text style={styles.exerciseDetailText}>{exercise?.category}</Text>
            </View>
            
            <View style={styles.exerciseDetailSection}>
              <Text style={styles.exerciseDetailLabel}>Muscle Groups</Text>
              <Text style={styles.exerciseDetailText}>{exercise?.muscleGroups?.join(', ')}</Text>
            </View>
            
            <View style={styles.exerciseDetailSection}>
              <Text style={styles.exerciseDetailLabel}>Equipment</Text>
              <Text style={styles.exerciseDetailText}>{exercise?.equipment}</Text>
            </View>
            
            <View style={styles.exerciseDetailSection}>
              <Text style={styles.exerciseDetailLabel}>Difficulty</Text>
              <Text style={styles.exerciseDetailText}>{exercise?.difficulty}</Text>
            </View>
            
            <View style={styles.exerciseDetailSection}>
              <Text style={styles.exerciseDetailLabel}>Instructions</Text>
              <Text style={styles.exerciseDetailText}>{exercise?.instructions}</Text>
            </View>
            
            {exercise?.tips && (
              <View style={styles.exerciseDetailSection}>
                <Text style={styles.exerciseDetailLabel}>Tips</Text>
                <Text style={styles.exerciseDetailText}>{exercise?.tips}</Text>
              </View>
            )}
          </ScrollView>
          
          <TouchableOpacity
            style={styles.addExerciseButton}
            onPress={() => {
              onSelect(exercise);
              setSelectedExercise(null);
            }}
          >
            <Icon name="add" size={20} color="#fff" />
            <Text style={styles.addExerciseButtonText}>Add to Workout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Choose Exercise</Text>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Icon name="filter-list" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search exercises or muscle groups..."
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm('')}>
              <Icon name="clear" size={20} color="#666" />
            </TouchableOpacity>
          )}
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
              <Text style={styles.filterLabel}>Equipment</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {equipmentOptions.map(equipment => (
                  <TouchableOpacity
                    key={equipment}
                    style={[
                      styles.filterChip,
                      selectedEquipment === equipment && styles.filterChipActive
                    ]}
                    onPress={() => setSelectedEquipment(equipment)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      selectedEquipment === equipment && styles.filterChipTextActive
                    ]}>
                      {equipment}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Difficulty</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {difficultyLevels.map(difficulty => (
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

            <TouchableOpacity style={styles.resetFiltersButton} onPress={resetFilters}>
              <Text style={styles.resetFiltersText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id}
          style={styles.exerciseList}
          renderItem={({ item: exercise }) => (
            <View style={styles.exerciseOption}>
              <TouchableOpacity
                style={styles.exerciseOptionMain}
                onPress={() => setSelectedExercise(exercise)}
              >
                <View style={styles.exerciseOptionInfo}>
                  <Text style={styles.exerciseOptionName}>{exercise.name}</Text>
                  <Text style={styles.exerciseOptionDetails}>
                    {exercise.type === 'time' 
                      ? `${exercise.defaultDuration}s duration`
                      : `${exercise.defaultSets || 1} sets × ${exercise.defaultReps} reps`
                    }
                  </Text>
                  <Text style={styles.exerciseOptionMuscles}>
                    {exercise.muscleGroups.join(' • ')}
                  </Text>
                  <View style={styles.exerciseOptionTags}>
                    <View style={styles.exerciseTag}>
                      <Text style={styles.exerciseTagText}>{exercise.category}</Text>
                    </View>
                    <View style={styles.exerciseTag}>
                      <Text style={styles.exerciseTagText}>{exercise.difficulty}</Text>
                    </View>
                    <View style={styles.exerciseTag}>
                      <Text style={styles.exerciseTagText}>{exercise.equipment}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAddButton}
                onPress={() => onSelect(exercise)}
              >
                <Icon name="add" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />

        {selectedExercise && renderExerciseDetails(selectedExercise)}
      </View>
    </Modal>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateButton: {
    padding: 8,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  addButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 10,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  addButtonSecondaryText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  exerciseCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 15,
    minWidth: 20,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  exerciseDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  exerciseActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionSpacing: {
    marginLeft: 15,
  },
  exerciseControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  moveButtons: {
    flexDirection: 'row',
  },
  moveButton: {
    padding: 5,
    marginLeft: 5,
  },
  moveButtonDisabled: {
    opacity: 0.3,
  },
  actionButtons: {
    marginTop: 20,
    marginBottom: 40,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  previewButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  previewButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  editModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  editRow: {
    marginBottom: 15,
  },
  editLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  saveEditButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 10,
  },
  saveEditButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Exercise Picker Modal styles
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
  },
  placeholder: {
    width: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  categoryContainer: {
    paddingVertical: 10,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#4CAF50',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  exerciseList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exerciseOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  exerciseOptionMain: {
    flex: 1,
  },
  exerciseOptionInfo: {
    flex: 1,
  },
  exerciseOptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  exerciseOptionDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  exerciseOptionMuscles: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  exerciseOptionTags: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  exerciseTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 4,
  },
  exerciseTagText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  quickAddButton: {
    padding: 10,
  },
  // Filter styles
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
  resetFiltersButton: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resetFiltersText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
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
  // Exercise detail modal styles
  exerciseDetailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  exerciseDetailModal: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '100%',
    maxHeight: '80%',
  },
  exerciseDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  exerciseDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  exerciseDetailContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  exerciseDetailSection: {
    marginBottom: 15,
  },
  exerciseDetailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  exerciseDetailText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  addExerciseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default WorkoutBuilderScreen;
