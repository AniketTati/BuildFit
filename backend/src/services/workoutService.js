const db = require('../database/connection');

class WorkoutService {
  // Get community workouts with filtering and pagination
  async getCommunityWorkouts({ page = 1, limit = 20, category, difficulty, sortBy = 'popular', search }) {
    const offset = (page - 1) * limit;
    
    let query = db('workout_plans as wp')
      .leftJoin('users as u', 'wp.created_by_user_id', 'u.id')
      .select(
        'wp.id',
        'wp.name',
        'wp.description',
        'wp.difficulty_level',
        'wp.estimated_duration_minutes',
        'wp.estimated_calories_burned',
        'wp.target_muscle_groups',
        'wp.equipment_needed',
        'wp.tags',
        'wp.likes_count',
        'wp.uses_count',
        'wp.created_at',
        'u.username as author',
        'u.id as author_id'
      )
      .where('wp.is_public', true)
      .where('wp.is_active', true);

    // Apply filters
    if (category && category !== 'All') {
      query = query.whereRaw('wp.tags::text ILIKE ?', [`%${category}%`]);
    }

    if (difficulty && difficulty !== 'All') {
      query = query.where('wp.difficulty_level', difficulty.toLowerCase());
    }

    if (search) {
      query = query.where(function() {
        this.whereRaw('wp.name ILIKE ?', [`%${search}%`])
          .orWhereRaw('wp.description ILIKE ?', [`%${search}%`])
          .orWhereRaw('u.username ILIKE ?', [`%${search}%`])
          .orWhereRaw('wp.tags::text ILIKE ?', [`%${search}%`]);
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        query = query.orderBy('wp.created_at', 'desc');
        break;
      case 'rating':
        // For now, we'll sort by likes_count as a proxy for rating
        // Later we can implement a proper rating system
        query = query.orderBy('wp.likes_count', 'desc');
        break;
      case 'popular':
      default:
        query = query.orderBy('wp.uses_count', 'desc').orderBy('wp.likes_count', 'desc');
        break;
    }

    // Get total count for pagination
    const countQuery = query.clone().clearSelect().clearOrder().count('* as total');
    const [{ total }] = await countQuery;

    // Get paginated results
    const workouts = await query.limit(limit).offset(offset);

    return {
      workouts: workouts.map(this.formatWorkout),
      page,
      limit,
      total: parseInt(total),
      pages: Math.ceil(total / limit)
    };
  }

  // Get specific community workout by ID
  async getCommunityWorkoutById(id) {
    const workout = await db('workout_plans as wp')
      .leftJoin('users as u', 'wp.created_by_user_id', 'u.id')
      .select(
        'wp.*',
        'u.username as author',
        'u.id as author_id'
      )
      .where('wp.id', id)
      .where('wp.is_public', true)
      .where('wp.is_active', true)
      .first();

    if (!workout) return null;

    // Get workout exercises (we'll need to create this table later)
    // For now, return the workout without exercises
    return this.formatWorkout(workout);
  }

  // Get user's workouts
  async getUserWorkouts(userId) {
    const workouts = await db('workout_plans')
      .select('*')
      .where('created_by_user_id', userId)
      .where('is_active', true)
      .orderBy('created_at', 'desc');

    return workouts.map(this.formatWorkout);
  }

  // Create new workout
  async createWorkout(workoutData) {
    const [workout] = await db('workout_plans')
      .insert({
        ...workoutData,
        target_muscle_groups: JSON.stringify(workoutData.target_muscle_groups || []),
        equipment_needed: JSON.stringify(workoutData.equipment_needed || []),
        tags: JSON.stringify(workoutData.tags || [])
      })
      .returning('*');

    return this.formatWorkout(workout);
  }

  // Get workout by ID (for authenticated user)
  async getWorkoutById(id, userId) {
    const workout = await db('workout_plans')
      .select('*')
      .where('id', id)
      .where('is_active', true)
      .where(function() {
        this.where('created_by_user_id', userId)
          .orWhere('is_public', true);
      })
      .first();

    if (!workout) return null;
    return this.formatWorkout(workout);
  }

  // Update workout
  async updateWorkout(id, updates, userId) {
    // Check if user owns the workout
    const existing = await db('workout_plans')
      .select('id')
      .where('id', id)
      .where('created_by_user_id', userId)
      .where('is_active', true)
      .first();

    if (!existing) return null;

    const updateData = { ...updates };
    if (updateData.target_muscle_groups) {
      updateData.target_muscle_groups = JSON.stringify(updateData.target_muscle_groups);
    }
    if (updateData.equipment_needed) {
      updateData.equipment_needed = JSON.stringify(updateData.equipment_needed);
    }
    if (updateData.tags) {
      updateData.tags = JSON.stringify(updateData.tags);
    }

    const [workout] = await db('workout_plans')
      .where('id', id)
      .update({
        ...updateData,
        updated_at: new Date()
      })
      .returning('*');

    return this.formatWorkout(workout);
  }

  // Delete workout (soft delete)
  async deleteWorkout(id, userId) {
    const result = await db('workout_plans')
      .where('id', id)
      .where('created_by_user_id', userId)
      .update({
        is_active: false,
        updated_at: new Date()
      });

    return result > 0;
  }

  // Publish workout to community
  async publishWorkout(id, userId, metadata = {}) {
    const updateData = {
      is_public: true,
      updated_at: new Date()
    };

    if (metadata.description) {
      updateData.description = metadata.description;
    }
    if (metadata.tags) {
      updateData.tags = JSON.stringify(metadata.tags);
    }

    const [workout] = await db('workout_plans')
      .where('id', id)
      .where('created_by_user_id', userId)
      .where('is_active', true)
      .update(updateData)
      .returning('*');

    if (!workout) return null;
    return this.formatWorkout(workout);
  }

  // Unpublish workout from community
  async unpublishWorkout(id, userId) {
    const [workout] = await db('workout_plans')
      .where('id', id)
      .where('created_by_user_id', userId)
      .update({
        is_public: false,
        updated_at: new Date()
      })
      .returning('*');

    if (!workout) return null;
    return this.formatWorkout(workout);
  }

  // Like workout (for now, just increment counter)
  async likeWorkout(id, userId) {
    // In a full implementation, we'd have a separate likes table
    // For now, just increment the counter
    const [workout] = await db('workout_plans')
      .where('id', id)
      .where('is_public', true)
      .where('is_active', true)
      .increment('likes_count', 1)
      .returning(['id', 'likes_count']);

    return workout;
  }

  // Unlike workout
  async unlikeWorkout(id, userId) {
    const [workout] = await db('workout_plans')
      .where('id', id)
      .where('is_public', true)
      .where('is_active', true)
      .where('likes_count', '>', 0)
      .decrement('likes_count', 1)
      .returning(['id', 'likes_count']);

    return workout;
  }

  // Copy workout to user's collection
  async copyWorkout(id, userId) {
    // Get the original workout
    const original = await db('workout_plans')
      .select('*')
      .where('id', id)
      .where('is_public', true)
      .where('is_active', true)
      .first();

    if (!original) return null;

    // Create a copy for the user
    const copyData = {
      ...original,
      id: undefined, // Let database generate new ID
      created_by_user_id: userId,
      is_public: false, // User's copy is private by default
      likes_count: 0,
      uses_count: 0,
      name: `${original.name} (Copy)`,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [copiedWorkout] = await db('workout_plans')
      .insert(copyData)
      .returning('*');

    // Increment uses count on original
    await db('workout_plans')
      .where('id', id)
      .increment('uses_count', 1);

    return this.formatWorkout(copiedWorkout);
  }

  // Rate workout (placeholder - would need separate ratings table)
  async rateWorkout(id, userId, { rating, review }) {
    // For now, just return success
    // In a full implementation, we'd store this in a separate ratings table
    return {
      workout_id: id,
      user_id: userId,
      rating,
      review,
      created_at: new Date()
    };
  }

  // Get workout ratings (placeholder)
  async getWorkoutRatings(id, { page = 1, limit = 10 }) {
    // Placeholder implementation
    // In a full implementation, we'd query the ratings table
    return {
      ratings: [],
      page,
      limit,
      total: 0,
      pages: 0
    };
  }

  // Helper method to format workout data
  formatWorkout(workout) {
    if (!workout) return null;

    return {
      ...workout,
      target_muscle_groups: this.parseJSON(workout.target_muscle_groups),
      equipment_needed: this.parseJSON(workout.equipment_needed),
      tags: this.parseJSON(workout.tags),
      difficulty: workout.difficulty_level,
      duration: workout.estimated_duration_minutes,
      muscleGroups: this.parseJSON(workout.target_muscle_groups),
      downloads: workout.uses_count,
      rating: 4.5, // Placeholder - would calculate from ratings table
      totalRatings: workout.likes_count || 0
    };
  }

  // Helper method to safely parse JSON strings
  parseJSON(jsonString) {
    if (!jsonString) return [];
    try {
      return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    } catch (e) {
      return [];
    }
  }
}

module.exports = new WorkoutService();
