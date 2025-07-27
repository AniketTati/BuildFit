import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  AppState,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  startSession,
  pauseSession,
  resumeSession,
  completeSession,
  nextExercise,
  previousExercise,
  updateSessionTime,
  setCurrentExercise,
} from '../store/slices/workoutSlice';

const WorkoutSessionScreen = ({ route, navigation }) => {
  const { workoutId, workout } = route.params;
  const dispatch = useDispatch();
  
  const {
    currentSession,
    currentExerciseIndex,
    isSessionActive,
    isPaused,
    sessionStartTime,
    totalSessionTime,
  } = useSelector(state => state.workout);
  
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  const timerRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);

  // Use workout from params if currentSession doesn't exist
  const workoutData = currentSession || workout;
  const currentExercise = workoutData?.exercises?.[currentExerciseIndex];
  const totalExercises = workoutData?.exercises?.length || 0;
  const isLastExercise = currentExerciseIndex === totalExercises - 1;

  useEffect(() => {
    // Start session if not already started
    if (!isSessionActive && (workoutId || workout)) {
      dispatch(startSession({ 
        workoutId: workoutId || workout.id,
        workout: workout 
      }));
    }

    // Handle back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
    // Handle app state changes for session persistence
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      backHandler.remove();
      appStateListener?.remove();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Start/stop timer based on session state
    if (isSessionActive && !isPaused) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isSessionActive, isPaused, isResting]);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      if (isResting) {
        setRestTimer(prev => {
          if (prev <= 1) {
            // Rest period complete, move to next exercise
            setIsResting(false);
            setRestTimer(0);
            handleNextExercise();
            return 0;
          }
          return prev - 1;
        });
      } else {
        setExerciseTimer(prev => prev + 1);
        dispatch(updateSessionTime());
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleAppStateChange = (nextAppState) => {
    // Persist session state when app backgrounds
    if (appStateRef.current.match(/active|foreground/) && nextAppState === 'background') {
      if (isSessionActive && !isPaused) {
        dispatch(pauseSession());
      }
    }
    appStateRef.current = nextAppState;
  };

  const handleBackPress = () => {
    if (isSessionActive) {
      setShowExitConfirm(true);
      return true; // Prevent default back action
    }
    return false;
  };

  const handlePause = () => {
    if (isPaused) {
      dispatch(resumeSession());
    } else {
      dispatch(pauseSession());
    }
  };

  const handleNextExercise = () => {
    if (isLastExercise) {
      handleCompleteWorkout();
    } else {
      // Start rest period if current exercise has rest time
      const restTime = currentExercise?.restTime || 0;
      if (restTime > 0) {
        setIsResting(true);
        setRestTimer(restTime);
        setExerciseTimer(0);
      } else {
        // No rest, move directly to next exercise
        dispatch(nextExercise());
        setExerciseTimer(0);
      }
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      dispatch(previousExercise());
      setExerciseTimer(0);
      setIsResting(false);
      setRestTimer(0);
    }
  };

  const handleCompleteWorkout = () => {
    Alert.alert(
      'Complete Workout',
      'Congratulations! You\'ve completed your workout. How do you feel?',
      [
        {
          text: 'Too Easy',
          onPress: () => completeWorkoutWithFeedback('easy'),
        },
        {
          text: 'Just Right',
          onPress: () => completeWorkoutWithFeedback('perfect'),
        },
        {
          text: 'Too Hard',
          onPress: () => completeWorkoutWithFeedback('hard'),
        },
      ]
    );
  };

  const completeWorkoutWithFeedback = (difficulty) => {
    dispatch(completeSession({ 
      difficulty,
      totalTime: totalSessionTime,
      exercisesCompleted: totalExercises,
    }));
    navigation.navigate('WorkoutComplete', { 
      sessionData: {
        totalTime: totalSessionTime,
        exercisesCompleted: totalExercises,
        difficulty,
      }
    });
  };

  const handleExitSession = () => {
    Alert.alert(
      'Exit Workout',
      'Are you sure you want to exit? Your progress will be saved.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setShowExitConfirm(false),
        },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            dispatch(pauseSession());
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!workoutData || !currentExercise) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading workout...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleExitSession} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentExerciseIndex + 1} / {totalExercises}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentExerciseIndex + 1) / totalExercises) * 100}%` }
              ]} 
            />
          </View>
        </View>
        <View style={styles.totalTimeContainer}>
          <Text style={styles.totalTimeText}>{formatTime(totalSessionTime)}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {isResting ? (
          // Rest Screen
          <View style={styles.restContainer}>
            <Text style={styles.restTitle}>Rest Time</Text>
            <Text style={styles.restTimer}>{formatTime(restTimer)}</Text>
            <Text style={styles.nextExerciseText}>
              Next: {workoutData.exercises[currentExerciseIndex + 1]?.name}
            </Text>
            <TouchableOpacity 
              style={styles.skipRestButton} 
              onPress={() => {
                setIsResting(false);
                setRestTimer(0);
                handleNextExercise();
              }}
            >
              <Text style={styles.skipRestButtonText}>Skip Rest</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Exercise Screen
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{currentExercise.name}</Text>
            
            {currentExercise.instructions && (
              <Text style={styles.exerciseInstructions}>
                {currentExercise.instructions}
              </Text>
            )}

            <View style={styles.exerciseDetails}>
              {currentExercise.duration ? (
                <Text style={styles.exerciseDetail}>
                  Duration: {formatTime(currentExercise.duration)}
                </Text>
              ) : (
                <Text style={styles.exerciseDetail}>
                  {currentExercise.sets} sets × {currentExercise.reps} reps
                </Text>
              )}
            </View>

            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>Exercise Time</Text>
              <Text style={styles.timer}>{formatTime(exerciseTimer)}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, styles.previousButton]} 
          onPress={handlePreviousExercise}
          disabled={currentExerciseIndex === 0}
        >
          <Text style={styles.controlButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, styles.pauseButton]} 
          onPress={handlePause}
        >
          <Text style={styles.controlButtonText}>
            {isPaused ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, styles.nextButton]} 
          onPress={handleNextExercise}
        >
          <Text style={styles.controlButtonText}>
            {isLastExercise ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
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
  exitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  totalTimeContainer: {
    width: 80,
    alignItems: 'flex-end',
  },
  totalTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  restContainer: {
    alignItems: 'center',
  },
  restTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 20,
  },
  restTimer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 20,
  },
  nextExerciseText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  skipRestButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  skipRestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseContainer: {
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  exerciseInstructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  exerciseDetails: {
    marginBottom: 40,
  },
  exerciseDetail: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  controlButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  previousButton: {
    backgroundColor: '#9E9E9E',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutSessionScreen;
