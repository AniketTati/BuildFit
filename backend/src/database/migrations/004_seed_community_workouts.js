/**
 * Migration: Seed community workouts
 */

exports.up = async function(knex) {
  // First, create a demo user for community workouts
  const demoUserId = await knex('users')
    .insert({
      username: 'FitnessProDemo',
      email: 'demo@buildfit.app',
      password_hash: '$2a$12$dummy.hash.for.demo.user.only',
      created_at: new Date(),
      updated_at: new Date()
    })
    .returning('id')
    .then(rows => rows[0].id);

  // Insert sample community workouts
  return knex('workout_plans').insert([
    {
      name: 'Morning Energy Boost',
      description: 'Quick 10-minute energizing workout to start your day',
      created_by_user_id: demoUserId,
      difficulty_level: 'beginner',
      estimated_duration_minutes: 10,
      estimated_calories_burned: 80,
      target_muscle_groups: JSON.stringify(['Full Body', 'Cardio']),
      equipment_needed: JSON.stringify(['None']),
      tags: JSON.stringify(['morning', 'energy', 'cardio', 'quick']),
      is_public: true,
      is_template: false,
      likes_count: 234,
      uses_count: 1250,
      created_at: new Date('2025-01-15T08:00:00Z'),
      updated_at: new Date('2025-01-15T08:00:00Z')
    },
    {
      name: 'Ultimate Core Crusher',
      description: 'Intense 15-minute ab workout that will leave your core burning',
      created_by_user_id: demoUserId,
      difficulty_level: 'advanced',
      estimated_duration_minutes: 15,
      estimated_calories_burned: 150,
      target_muscle_groups: JSON.stringify(['Core', 'Abs']),
      equipment_needed: JSON.stringify(['Mat']),
      tags: JSON.stringify(['core', 'abs', 'strength', 'intense']),
      is_public: true,
      is_template: false,
      likes_count: 189,
      uses_count: 876,
      created_at: new Date('2025-01-16T14:30:00Z'),
      updated_at: new Date('2025-01-16T14:30:00Z')
    },
    {
      name: 'Beginner Full Body',
      description: 'Perfect starter workout for those new to fitness',
      created_by_user_id: demoUserId,
      difficulty_level: 'beginner',
      estimated_duration_minutes: 20,
      estimated_calories_burned: 120,
      target_muscle_groups: JSON.stringify(['Full Body', 'Strength']),
      equipment_needed: JSON.stringify(['Dumbbells']),
      tags: JSON.stringify(['beginner', 'full-body', 'strength', 'starter']),
      is_public: true,
      is_template: false,
      likes_count: 345,
      uses_count: 2100,
      created_at: new Date('2025-01-17T10:00:00Z'),
      updated_at: new Date('2025-01-17T10:00:00Z')
    },
    {
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for maximum calorie burn',
      created_by_user_id: demoUserId,
      difficulty_level: 'intermediate',
      estimated_duration_minutes: 25,
      estimated_calories_burned: 300,
      target_muscle_groups: JSON.stringify(['Cardio', 'Full Body']),
      equipment_needed: JSON.stringify(['None']),
      tags: JSON.stringify(['hiit', 'cardio', 'intense', 'fat-burn']),
      is_public: true,
      is_template: false,
      likes_count: 156,
      uses_count: 687,
      created_at: new Date('2025-01-18T09:15:00Z'),
      updated_at: new Date('2025-01-18T09:15:00Z')
    },
    {
      name: 'Yoga Flow & Stretch',
      description: 'Relaxing 30-minute yoga session for flexibility and mindfulness',
      created_by_user_id: demoUserId,
      difficulty_level: 'beginner',
      estimated_duration_minutes: 30,
      estimated_calories_burned: 100,
      target_muscle_groups: JSON.stringify(['Flexibility', 'Core']),
      equipment_needed: JSON.stringify(['Mat']),
      tags: JSON.stringify(['yoga', 'flexibility', 'relaxation', 'mindfulness']),
      is_public: true,
      is_template: false,
      likes_count: 278,
      uses_count: 1456,
      created_at: new Date('2025-01-18T10:15:00Z'),
      updated_at: new Date('2025-01-18T10:15:00Z')
    }
  ]);
};

exports.down = function(knex) {
  // Remove all demo data
  return knex('workout_plans')
    .where('is_public', true)
    .del()
    .then(() => {
      return knex('users')
        .where('email', 'demo@buildfit.app')
        .del();
    });
};
