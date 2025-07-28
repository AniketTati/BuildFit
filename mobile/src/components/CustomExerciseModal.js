import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomExerciseModal = ({ visible, onClose, onSave }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseType, setExerciseType] = useState('reps'); // 'reps' or 'time'
  const [category, setCategory] = useState('Strength');
  const [equipment, setEquipment] = useState('None');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [instructions, setInstructions] = useState('');
  const [tips, setTips] = useState('');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [defaultReps, setDefaultReps] = useState('10');
  const [defaultSets, setDefaultSets] = useState('1');
  const [defaultDuration, setDefaultDuration] = useState('30');

  const categories = ['Cardio', 'Strength', 'Core', 'Flexibility', 'HIIT'];
  const equipmentOptions = ['None', 'Dumbbells', 'Barbell', 'Resistance Bands', 'Pull-up Bar', 'Kettlebell', 'Exercise Ball', 'Other'];
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const muscleGroups = [
    'Chest', 'Back', 'Shoulders', 'Arms', 'Biceps', 'Triceps',
    'Core', 'Abs', 'Legs', 'Quads', 'Hamstrings', 'Glutes',
    'Calves', 'Cardio', 'Full Body', 'Neck', 'Mobility'
  ];

  const resetForm = () => {
    setExerciseName('');
    setExerciseType('reps');
    setCategory('Strength');
    setEquipment('None');
    setDifficulty('Beginner');
    setInstructions('');
    setTips('');
    setSelectedMuscleGroups([]);
    setDefaultReps('10');
    setDefaultSets('1');
    setDefaultDuration('30');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const toggleMuscleGroup = (muscleGroup) => {
    setSelectedMuscleGroups(prev => 
      prev.includes(muscleGroup)
        ? prev.filter(mg => mg !== muscleGroup)
        : [...prev, muscleGroup]
    );
  };

  const validateAndSave = () => {
    // Validation
    if (!exerciseName.trim()) {
      Alert.alert('Error', 'Please enter an exercise name');
      return;
    }

    if (!instructions.trim()) {
      Alert.alert('Error', 'Please enter exercise instructions');
      return;
    }

    if (selectedMuscleGroups.length === 0) {
      Alert.alert('Error', 'Please select at least one muscle group');
      return;
    }

    if (exerciseType === 'reps') {
      if (!defaultReps || isNaN(defaultReps) || parseInt(defaultReps) <= 0) {
        Alert.alert('Error', 'Please enter valid default reps');
        return;
      }
      if (!defaultSets || isNaN(defaultSets) || parseInt(defaultSets) <= 0) {
        Alert.alert('Error', 'Please enter valid default sets');
        return;
      }
    } else {
      if (!defaultDuration || isNaN(defaultDuration) || parseInt(defaultDuration) <= 0) {
        Alert.alert('Error', 'Please enter valid default duration');
        return;
      }
    }

    // Create new exercise object
    const newExercise = {
      id: `custom-${Date.now()}`,
      name: exerciseName.trim(),
      category,
      type: exerciseType,
      muscleGroups: selectedMuscleGroups,
      equipment,
      difficulty,
      instructions: instructions.trim(),
      tips: tips.trim() || undefined,
      ...(exerciseType === 'time' 
        ? { defaultDuration: parseInt(defaultDuration) }
        : { 
            defaultReps: parseInt(defaultReps), 
            defaultSets: parseInt(defaultSets) 
          }
      ),
    };

    onSave(newExercise);
    resetForm();
    onClose();
    Alert.alert('Success', 'Custom exercise created successfully!');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Custom Exercise</Text>
          <TouchableOpacity onPress={validateAndSave}>
            <Icon name="check" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Basic Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Exercise Name *</Text>
              <TextInput
                style={styles.textInput}
                value={exerciseName}
                onChangeText={setExerciseName}
                placeholder="Enter exercise name"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Exercise Type *</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeOption,
                    exerciseType === 'reps' && styles.typeOptionActive
                  ]}
                  onPress={() => setExerciseType('reps')}
                >
                  <Text style={[
                    styles.typeOptionText,
                    exerciseType === 'reps' && styles.typeOptionTextActive
                  ]}>
                    Reps & Sets
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeOption,
                    exerciseType === 'time' && styles.typeOptionActive
                  ]}
                  onPress={() => setExerciseType('time')}
                >
                  <Text style={[
                    styles.typeOptionText,
                    exerciseType === 'time' && styles.typeOptionTextActive
                  ]}>
                    Time Duration
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {exerciseType === 'reps' ? (
              <View style={styles.repsContainer}>
                <View style={styles.repsInputGroup}>
                  <Text style={styles.inputLabel}>Default Reps *</Text>
                  <TextInput
                    style={styles.numberInput}
                    value={defaultReps}
                    onChangeText={setDefaultReps}
                    placeholder="10"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.repsInputGroup}>
                  <Text style={styles.inputLabel}>Default Sets *</Text>
                  <TextInput
                    style={styles.numberInput}
                    value={defaultSets}
                    onChangeText={setDefaultSets}
                    placeholder="1"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            ) : (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Default Duration (seconds) *</Text>
                <TextInput
                  style={styles.numberInput}
                  value={defaultDuration}
                  onChangeText={setDefaultDuration}
                  placeholder="30"
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>

          {/* Categories and Properties */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories & Properties</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.selectionChip,
                      category === cat && styles.selectionChipActive
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text style={[
                      styles.selectionChipText,
                      category === cat && styles.selectionChipTextActive
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Equipment *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {equipmentOptions.map(eq => (
                  <TouchableOpacity
                    key={eq}
                    style={[
                      styles.selectionChip,
                      equipment === eq && styles.selectionChipActive
                    ]}
                    onPress={() => setEquipment(eq)}
                  >
                    <Text style={[
                      styles.selectionChipText,
                      equipment === eq && styles.selectionChipTextActive
                    ]}>
                      {eq}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Difficulty *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {difficultyLevels.map(diff => (
                  <TouchableOpacity
                    key={diff}
                    style={[
                      styles.selectionChip,
                      difficulty === diff && styles.selectionChipActive
                    ]}
                    onPress={() => setDifficulty(diff)}
                  >
                    <Text style={[
                      styles.selectionChipText,
                      difficulty === diff && styles.selectionChipTextActive
                    ]}>
                      {diff}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Muscle Groups */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Muscle Groups *</Text>
            <Text style={styles.sectionSubtitle}>Select all muscle groups this exercise targets</Text>
            
            <View style={styles.muscleGroupsContainer}>
              {muscleGroups.map(muscle => (
                <TouchableOpacity
                  key={muscle}
                  style={[
                    styles.muscleGroupChip,
                    selectedMuscleGroups.includes(muscle) && styles.muscleGroupChipActive
                  ]}
                  onPress={() => toggleMuscleGroup(muscle)}
                >
                  <Text style={[
                    styles.muscleGroupChipText,
                    selectedMuscleGroups.includes(muscle) && styles.muscleGroupChipTextActive
                  ]}>
                    {muscle}
                  </Text>
                  {selectedMuscleGroups.includes(muscle) && (
                    <Icon name="check" size={14} color="#fff" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions & Tips</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Exercise Instructions *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={instructions}
                onChangeText={setInstructions}
                placeholder="Describe how to perform this exercise..."
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tips (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={tips}
                onChangeText={setTips}
                placeholder="Add helpful tips for performing this exercise..."
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.saveSection}>
            <TouchableOpacity style={styles.saveButton} onPress={validateAndSave}>
              <Icon name="add" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Create Exercise</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    textAlign: 'center',
    minWidth: 80,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 2,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  typeOptionActive: {
    backgroundColor: '#4CAF50',
  },
  typeOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  typeOptionTextActive: {
    color: '#fff',
  },
  repsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  repsInputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  selectionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectionChipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  selectionChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  selectionChipTextActive: {
    color: '#fff',
  },
  muscleGroupsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleGroupChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  muscleGroupChipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  muscleGroupChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  muscleGroupChipTextActive: {
    color: '#fff',
  },
  checkIcon: {
    marginLeft: 4,
  },
  saveSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CustomExerciseModal;
