// Exercise Database - Comprehensive list of exercises for BuildFit
export const exerciseDatabase = [
  // Cardio Exercises
  {
    id: 'cardio-001',
    name: 'Jumping Jacks',
    category: 'Cardio',
    type: 'time',
    defaultDuration: 30,
    muscleGroups: ['Full Body', 'Cardio'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Stand with feet together, jump while raising arms overhead and spreading legs apart. Return to starting position.',
    tips: 'Keep your core engaged and land softly on your feet.',
  },
  {
    id: 'cardio-002',
    name: 'High Knees',
    category: 'Cardio',
    type: 'time',
    defaultDuration: 30,
    muscleGroups: ['Legs', 'Cardio'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Run in place, bringing knees up to waist level as quickly as possible.',
    tips: 'Pump your arms and stay on the balls of your feet.',
  },
  {
    id: 'cardio-003',
    name: 'Mountain Climbers',
    category: 'Cardio',
    type: 'time',
    defaultDuration: 30,
    muscleGroups: ['Core', 'Cardio', 'Arms'],
    equipment: 'None',
    difficulty: 'Intermediate',
    instructions: 'Start in plank position, alternate bringing knees to chest rapidly.',
    tips: 'Keep your core tight and hips level throughout the movement.',
  },
  {
    id: 'cardio-004',
    name: 'Burpees',
    category: 'Cardio',
    type: 'reps',
    defaultReps: 8,
    defaultSets: 1,
    muscleGroups: ['Full Body', 'Cardio'],
    equipment: 'None',
    difficulty: 'Advanced',
    instructions: 'Squat down, jump back to plank, do a push-up, jump forward, then jump up.',
    tips: 'Modify by stepping back instead of jumping if needed.',
  },

  // Strength - Upper Body
  {
    id: 'strength-001',
    name: 'Push-ups',
    category: 'Strength',
    type: 'reps',
    defaultReps: 10,
    defaultSets: 1,
    muscleGroups: ['Chest', 'Arms', 'Core'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Start in plank position, lower chest to ground, push back up.',
    tips: 'Keep your body in a straight line from head to heels.',
  },
  {
    id: 'strength-002',
    name: 'Pike Push-ups',
    category: 'Strength',
    type: 'reps',
    defaultReps: 8,
    defaultSets: 1,
    muscleGroups: ['Shoulders', 'Arms'],
    equipment: 'None',
    difficulty: 'Intermediate',
    instructions: 'Start in downward dog position, lower head toward hands, push back up.',
    tips: 'Focus on using your shoulders and keep your core engaged.',
  },
  {
    id: 'strength-003',
    name: 'Tricep Dips',
    category: 'Strength',
    type: 'reps',
    defaultReps: 10,
    defaultSets: 1,
    muscleGroups: ['Arms', 'Shoulders'],
    equipment: 'Chair/Bench',
    difficulty: 'Beginner',
    instructions: 'Sit on edge of chair, lower body down, push back up using arms.',
    tips: 'Keep your body close to the chair and control the movement.',
  },

  // Strength - Lower Body
  {
    id: 'strength-004',
    name: 'Squats',
    category: 'Strength',
    type: 'reps',
    defaultReps: 15,
    defaultSets: 1,
    muscleGroups: ['Legs', 'Glutes'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Feet shoulder-width apart, lower hips back and down, return to standing.',
    tips: 'Keep your chest up and weight in your heels.',
  },
  {
    id: 'strength-005',
    name: 'Lunges',
    category: 'Strength',
    type: 'reps',
    defaultReps: 10,
    defaultSets: 2,
    muscleGroups: ['Legs', 'Glutes'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Step forward into lunge position, lower back knee, return to standing.',
    tips: 'Keep your front knee over your ankle and chest upright.',
  },
  {
    id: 'strength-006',
    name: 'Jump Squats',
    category: 'Strength',
    type: 'reps',
    defaultReps: 12,
    defaultSets: 1,
    muscleGroups: ['Legs', 'Glutes', 'Cardio'],
    equipment: 'None',
    difficulty: 'Intermediate',
    instructions: 'Perform a squat, then explode up into a jump, land softly.',
    tips: 'Land with soft knees and immediately go into the next squat.',
  },
  {
    id: 'strength-007',
    name: 'Single Leg Glute Bridges',
    category: 'Strength',
    type: 'reps',
    defaultReps: 12,
    defaultSets: 2,
    muscleGroups: ['Glutes', 'Core'],
    equipment: 'None',
    difficulty: 'Intermediate',
    instructions: 'Lie on back, one foot flat, other leg extended, lift hips up.',
    tips: 'Squeeze your glutes at the top and keep your core engaged.',
  },

  // Core Exercises
  {
    id: 'core-001',
    name: 'Plank',
    category: 'Core',
    type: 'time',
    defaultDuration: 45,
    muscleGroups: ['Core', 'Arms'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Hold your body straight in plank position, weight on forearms and toes.',
    tips: 'Keep your core tight and avoid sagging or piking your hips.',
  },
  {
    id: 'core-002',
    name: 'Russian Twists',
    category: 'Core',
    type: 'reps',
    defaultReps: 20,
    defaultSets: 1,
    muscleGroups: ['Core', 'Obliques'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Sit with knees bent, lean back slightly, rotate torso side to side.',
    tips: 'Keep your feet off the ground for added difficulty.',
  },
  {
    id: 'core-003',
    name: 'Dead Bug',
    category: 'Core',
    type: 'reps',
    defaultReps: 10,
    defaultSets: 2,
    muscleGroups: ['Core', 'Hip Flexors'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Lie on back, slowly extend opposite arm and leg, return to start.',
    tips: 'Keep your lower back pressed to the floor throughout.',
  },
  {
    id: 'core-004',
    name: 'Bicycle Crunches',
    category: 'Core',
    type: 'reps',
    defaultReps: 20,
    defaultSets: 1,
    muscleGroups: ['Core', 'Obliques'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Lie on back, alternate bringing elbow to opposite knee.',
    tips: 'Focus on slow, controlled movements rather than speed.',
  },
  {
    id: 'core-005',
    name: 'Plank Jacks',
    category: 'Core',
    type: 'time',
    defaultDuration: 30,
    muscleGroups: ['Core', 'Cardio'],
    equipment: 'None',
    difficulty: 'Intermediate',
    instructions: 'In plank position, jump feet apart and together like jumping jacks.',
    tips: 'Keep your core engaged and avoid bouncing your hips.',
  },

  // Flexibility/Mobility
  {
    id: 'flex-001',
    name: 'Head Rotation',
    category: 'Flexibility',
    type: 'reps',
    defaultReps: 10,
    defaultSets: 1,
    muscleGroups: ['Neck', 'Mobility'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Slowly rotate head in circles, both clockwise and counterclockwise.',
    tips: 'Move slowly and gently, stop if you feel any pain.',
  },
  {
    id: 'flex-002',
    name: 'Arm Circles',
    category: 'Flexibility',
    type: 'time',
    defaultDuration: 30,
    muscleGroups: ['Shoulders', 'Mobility'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'Extend arms out to sides, make small circles, gradually increase size.',
    tips: 'Start small and gradually increase the circle size.',
  },
  {
    id: 'flex-003',
    name: 'Cat-Cow Stretch',
    category: 'Flexibility',
    type: 'reps',
    defaultReps: 10,
    defaultSets: 1,
    muscleGroups: ['Back', 'Core'],
    equipment: 'None',
    difficulty: 'Beginner',
    instructions: 'On hands and knees, alternate between arching and rounding your back.',
    tips: 'Move slowly and breathe deeply with each movement.',
  },

  // HIIT/Advanced
  {
    id: 'hiit-001',
    name: 'Push-up to T',
    category: 'HIIT',
    type: 'reps',
    defaultReps: 8,
    defaultSets: 1,
    muscleGroups: ['Chest', 'Core', 'Arms'],
    equipment: 'None',
    difficulty: 'Advanced',
    instructions: 'Do a push-up, then rotate into side plank, alternating sides.',
    tips: 'Keep your core tight during the rotation.',
  },
  {
    id: 'hiit-002',
    name: 'Lunge Jumps',
    category: 'HIIT',
    type: 'reps',
    defaultReps: 10,
    defaultSets: 1,
    muscleGroups: ['Legs', 'Cardio'],
    equipment: 'None',
    difficulty: 'Advanced',
    instructions: 'Start in lunge position, jump and switch legs mid-air.',
    tips: 'Land softly and immediately go into the next lunge.',
  },
];

// Categories for filtering
export const exerciseCategories = [
  'All',
  'Cardio',
  'Strength',
  'Core',
  'Flexibility',
  'HIIT',
];

// Difficulty levels
export const difficultyLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

// Equipment types
export const equipmentTypes = [
  'None',
  'Chair/Bench',
  'Dumbbells',
  'Resistance Bands',
  'Mat',
];

// Helper functions
export const getExercisesByCategory = (category) => {
  if (category === 'All') return exerciseDatabase;
  return exerciseDatabase.filter(exercise => exercise.category === category);
};

export const getExercisesByDifficulty = (difficulty) => {
  return exerciseDatabase.filter(exercise => exercise.difficulty === difficulty);
};

export const getExercisesByEquipment = (equipment) => {
  return exerciseDatabase.filter(exercise => exercise.equipment === equipment);
};

export const searchExercises = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return exerciseDatabase.filter(exercise => 
    exercise.name.toLowerCase().includes(term) ||
    exercise.muscleGroups.some(group => group.toLowerCase().includes(term)) ||
    exercise.category.toLowerCase().includes(term)
  );
};

export default exerciseDatabase;
