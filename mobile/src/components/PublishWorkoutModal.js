import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Switch,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityWorkoutAPI from '../services/communityWorkoutAPI';

const PublishWorkoutModal = ({ visible, workout, onClose, onPublish }) => {
  const user = useSelector(state => state.auth.user);
  
  const [publishData, setPublishData] = useState({
    name: workout?.name || '',
    description: workout?.description || '',
    tags: '',
    isPublic: true,
    allowModifications: true,
    category: workout?.category || 'Strength',
  });

  const categories = ['Cardio', 'Strength', 'Core', 'Flexibility', 'HIIT'];

  const resetForm = () => {
    setPublishData({
      name: workout?.name || '',
      description: workout?.description || '',
      tags: '',
      isPublic: true,
      allowModifications: true,
      category: workout?.category || 'Strength',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateAndPublish = async () => {
    if (!publishData.name.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }

    if (!publishData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    if (!workout.exercises || workout.exercises.length === 0) {
      Alert.alert('Error', 'Cannot publish workout with no exercises');
      return;
    }

    const publishInfo = {
      ...publishData,
      tags: publishData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      workoutId: workout.id,
      author: user?.name || 'Anonymous',
      authorId: user?.id || 'anonymous',
    };

    try {
      // Try to publish via API if user is authenticated
      if (user?.token) {
        const response = await CommunityWorkoutAPI.publishWorkout(
          workout.id, 
          publishInfo, 
          user.token
        );
        
        if (response.success) {
          Alert.alert(
            'Published Successfully!', 
            `"${publishInfo.name}" has been published to the community.`
          );
          handleClose();
          return;
        }
      }
      
      // Fallback to parent handler
      onPublish(publishInfo);
      handleClose();
    } catch (error) {
      console.error('Error publishing workout:', error);
      
      // Still call parent handler as fallback
      onPublish(publishInfo);
      handleClose();
    }
  };

  if (!workout) return null;

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
          <Text style={styles.headerTitle}>Publish to Community</Text>
          <TouchableOpacity onPress={validateAndPublish}>
            <Icon name="publish" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Workout Preview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Workout Preview</Text>
            <View style={styles.workoutPreview}>
              <Text style={styles.previewWorkoutName}>{workout.name}</Text>
              <View style={styles.previewStats}>
                <View style={styles.previewStat}>
                  <Icon name="fitness-center" size={16} color="#666" />
                  <Text style={styles.previewStatText}>{workout.exercises.length} exercises</Text>
                </View>
                <View style={styles.previewStat}>
                  <Icon name="schedule" size={16} color="#666" />
                  <Text style={styles.previewStatText}>{Math.round(workout.duration / 60)} min</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Publishing Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Publishing Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Public Name *</Text>
              <TextInput
                style={styles.textInput}
                value={publishData.name}
                onChangeText={(value) => setPublishData({...publishData, name: value})}
                placeholder="Name for the community workout"
                maxLength={60}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={publishData.description}
                onChangeText={(value) => setPublishData({...publishData, description: value})}
                placeholder="Describe what makes this workout special..."
                multiline={true}
                numberOfLines={4}
                maxLength={300}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      publishData.category === category && styles.categoryChipActive
                    ]}
                    onPress={() => setPublishData({...publishData, category})}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      publishData.category === category && styles.categoryChipTextActive
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tags (Optional)</Text>
              <TextInput
                style={styles.textInput}
                value={publishData.tags}
                onChangeText={(value) => setPublishData({...publishData, tags: value})}
                placeholder="Add tags separated by commas (e.g. quick, morning, cardio)"
                maxLength={100}
              />
              <Text style={styles.inputHelper}>Help others discover your workout with relevant tags</Text>
            </View>
          </View>

          {/* Privacy & Permissions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy & Permissions</Text>
            
            <View style={styles.switchGroup}>
              <View style={styles.switchInfo}>
                <Text style={styles.switchLabel}>Make Public</Text>
                <Text style={styles.switchDescription}>
                  Allow anyone to discover and download this workout
                </Text>
              </View>
              <Switch
                value={publishData.isPublic}
                onValueChange={(value) => setPublishData({...publishData, isPublic: value})}
                trackColor={{ false: '#ddd', true: '#4CAF50' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchGroup}>
              <View style={styles.switchInfo}>
                <Text style={styles.switchLabel}>Allow Modifications</Text>
                <Text style={styles.switchDescription}>
                  Let others modify and republish variations of your workout
                </Text>
              </View>
              <Switch
                value={publishData.allowModifications}
                onValueChange={(value) => setPublishData({...publishData, allowModifications: value})}
                trackColor={{ false: '#ddd', true: '#4CAF50' }}
                thumbColor="#fff"
              />
            </View>
          </View>

          {/* Exercise List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exercises ({workout.exercises.length})</Text>
            {workout.exercises.map((exercise, index) => (
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

          {/* Publishing Guidelines */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Community Guidelines</Text>
            <View style={styles.guidelines}>
              <View style={styles.guidelineItem}>
                <Icon name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.guidelineText}>
                  Ensure your workout is safe and appropriate for the intended difficulty level
                </Text>
              </View>
              <View style={styles.guidelineItem}>
                <Icon name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.guidelineText}>
                  Provide clear and accurate descriptions
                </Text>
              </View>
              <View style={styles.guidelineItem}>
                <Icon name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.guidelineText}>
                  Use relevant tags to help others find your content
                </Text>
              </View>
              <View style={styles.guidelineItem}>
                <Icon name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.guidelineText}>
                  Respect intellectual property and give credit where due
                </Text>
              </View>
            </View>
          </View>

          {/* Publish Button */}
          <View style={styles.publishSection}>
            <TouchableOpacity style={styles.publishButton} onPress={validateAndPublish}>
              <Icon name="publish" size={20} color="#fff" />
              <Text style={styles.publishButtonText}>Publish to Community</Text>
            </TouchableOpacity>
            <Text style={styles.publishDisclaimer}>
              By publishing, you agree to share this workout with the BuildFit community
              under the selected permissions.
            </Text>
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
    marginBottom: 15,
  },
  workoutPreview: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
  },
  previewWorkoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  previewStats: {
    flexDirection: 'row',
  },
  previewStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  previewStatText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
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
  inputHelper: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryChipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  switchInfo: {
    flex: 1,
    marginRight: 15,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
  guidelines: {
    marginTop: 5,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  guidelineText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginLeft: 8,
  },
  publishSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  publishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  publishDisclaimer: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default PublishWorkoutModal;
