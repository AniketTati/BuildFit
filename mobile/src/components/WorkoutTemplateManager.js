import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TEMPLATES_STORAGE_KEY = '@workout_templates';

const WorkoutTemplateManager = ({ 
  visible, 
  onClose, 
  onSelectTemplate, 
  currentWorkout,
  onSaveTemplate 
}) => {
  const [templates, setTemplates] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      loadTemplates();
    }
  }, [visible]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const templatesData = await AsyncStorage.getItem(TEMPLATES_STORAGE_KEY);
      if (templatesData) {
        setTemplates(JSON.parse(templatesData));
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      Alert.alert('Error', 'Failed to load workout templates');
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async () => {
    if (!templateName.trim()) {
      Alert.alert('Error', 'Please enter a template name');
      return;
    }

    if (!currentWorkout.exercises || currentWorkout.exercises.length === 0) {
      Alert.alert('Error', 'Cannot save empty workout as template');
      return;
    }

    try {
      setLoading(true);
      const newTemplate = {
        id: Date.now().toString(),
        name: templateName.trim(),
        description: templateDescription.trim(),
        exercises: currentWorkout.exercises,
        estimatedDuration: calculateTotalTime(currentWorkout.exercises),
        createdAt: new Date().toISOString(),
        difficulty: determineDifficulty(currentWorkout.exercises),
        muscleGroups: getUniqueMuscleGroups(currentWorkout.exercises),
      };

      const updatedTemplates = [...templates, newTemplate];
      await AsyncStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(updatedTemplates));
      setTemplates(updatedTemplates);
      
      setTemplateName('');
      setTemplateDescription('');
      setShowSaveModal(false);
      
      Alert.alert('Success', 'Template saved successfully!');
      
      if (onSaveTemplate) {
        onSaveTemplate(newTemplate);
      }
    } catch (error) {
      console.error('Error saving template:', error);
      Alert.alert('Error', 'Failed to save template');
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (templateId) => {
    Alert.alert(
      'Delete Template',
      'Are you sure you want to delete this template?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedTemplates = templates.filter(t => t.id !== templateId);
              await AsyncStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(updatedTemplates));
              setTemplates(updatedTemplates);
            } catch (error) {
              console.error('Error deleting template:', error);
              Alert.alert('Error', 'Failed to delete template');
            }
          }
        }
      ]
    );
  };

  const calculateTotalTime = (exercises) => {
    return exercises.reduce((total, exercise) => {
      const exerciseTime = exercise.type === 'time' 
        ? exercise.duration 
        : (exercise.sets || 1) * 30;
      return total + exerciseTime + (exercise.restTime || 0);
    }, 0);
  };

  const determineDifficulty = (exercises) => {
    const difficultyLevels = exercises.map(ex => ex.difficulty || 'Beginner');
    if (difficultyLevels.includes('Advanced')) return 'Advanced';
    if (difficultyLevels.includes('Intermediate')) return 'Intermediate';
    return 'Beginner';
  };

  const getUniqueMuscleGroups = (exercises) => {
    const allGroups = exercises.flatMap(ex => ex.muscleGroups || []);
    return [...new Set(allGroups)];
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
  };

  const renderTemplate = ({ item: template }) => (
    <View style={styles.templateCard}>
      <TouchableOpacity
        style={styles.templateContent}
        onPress={() => {
          onSelectTemplate(template);
          onClose();
        }}
      >
        <Text style={styles.templateName}>{template.name}</Text>
        {template.description && (
          <Text style={styles.templateDescription}>{template.description}</Text>
        )}
        
        <View style={styles.templateStats}>
          <View style={styles.statItem}>
            <Icon name="fitness-center" size={16} color="#666" />
            <Text style={styles.statText}>{template.exercises.length} exercises</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="schedule" size={16} color="#666" />
            <Text style={styles.statText}>{formatDuration(template.estimatedDuration)}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="trending-up" size={16} color="#666" />
            <Text style={styles.statText}>{template.difficulty}</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.muscleGroupsContainer}
        >
          {template.muscleGroups.map((group, index) => (
            <View key={index} style={styles.muscleGroupTag}>
              <Text style={styles.muscleGroupText}>{group}</Text>
            </View>
          ))}
        </ScrollView>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTemplate(template.id)}
      >
        <Icon name="delete" size={20} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  const SaveTemplateModal = () => (
    <Modal
      visible={showSaveModal}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowSaveModal(false)}
    >
      <View style={styles.saveModalOverlay}>
        <View style={styles.saveModalContent}>
          <Text style={styles.saveModalTitle}>Save as Template</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Template Name *</Text>
            <TextInput
              style={styles.textInput}
              value={templateName}
              onChangeText={setTemplateName}
              placeholder="Enter template name"
              autoFocus={true}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={templateDescription}
              onChangeText={setTemplateDescription}
              placeholder="Describe this workout..."
              multiline={true}
              numberOfLines={3}
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowSaveModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={saveTemplate}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? 'Saving...' : 'Save Template'}
              </Text>
            </TouchableOpacity>
          </View>
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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Workout Templates</Text>
          <TouchableOpacity
            onPress={() => setShowSaveModal(true)}
            disabled={!currentWorkout?.exercises?.length}
          >
            <Icon 
              name="bookmark-add" 
              size={24} 
              color={currentWorkout?.exercises?.length ? "#4CAF50" : "#ccc"} 
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading templates...</Text>
          </View>
        ) : templates.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="bookmark-border" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No Templates Yet</Text>
            <Text style={styles.emptyText}>
              Create your first workout and save it as a template to use again later.
            </Text>
            {currentWorkout?.exercises?.length > 0 && (
              <TouchableOpacity
                style={styles.createTemplateButton}
                onPress={() => setShowSaveModal(true)}
              >
                <Icon name="bookmark-add" size={20} color="#fff" />
                <Text style={styles.createTemplateButtonText}>Save Current Workout</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <FlatList
            data={templates}
            renderItem={renderTemplate}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.templatesList}
            showsVerticalScrollIndicator={false}
          />
        )}

        <SaveTemplateModal />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  createTemplateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  createTemplateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  templatesList: {
    padding: 20,
  },
  templateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  templateContent: {
    flex: 1,
    padding: 15,
  },
  templateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  templateDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 18,
  },
  templateStats: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  muscleGroupsContainer: {
    marginTop: 5,
  },
  muscleGroupTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  muscleGroupText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 15,
  },
  // Save Modal Styles
  saveModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  saveModalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  saveModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
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
  saveButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WorkoutTemplateManager;
