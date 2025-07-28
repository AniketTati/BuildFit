const workoutService = require('../services/workoutService');
const { validateWorkout, validateWorkoutUpdate } = require('../validators/workoutValidator');

class WorkoutController {
  // Get community workouts (public)
  async getCommunityWorkouts(req, res) {
    try {
      const {
        page = 1,
        limit = 20,
        category,
        difficulty,
        sortBy = 'popular', // popular, recent, rating
        search
      } = req.query;

      const result = await workoutService.getCommunityWorkouts({
        page: parseInt(page),
        limit: parseInt(limit),
        category,
        difficulty,
        sortBy,
        search
      });

      res.json({
        success: true,
        data: result.workouts,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          pages: result.pages
        }
      });
    } catch (error) {
      console.error('Error fetching community workouts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch community workouts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get specific community workout by ID (public)
  async getCommunityWorkoutById(req, res) {
    try {
      const { id } = req.params;
      const workout = await workoutService.getCommunityWorkoutById(id);

      if (!workout) {
        return res.status(404).json({
          success: false,
          message: 'Workout not found'
        });
      }

      res.json({
        success: true,
        data: workout
      });
    } catch (error) {
      console.error('Error fetching community workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get user's workouts (private)
  async getUserWorkouts(req, res) {
    try {
      const userId = req.user.id;
      const workouts = await workoutService.getUserWorkouts(userId);

      res.json({
        success: true,
        data: workouts
      });
    } catch (error) {
      console.error('Error fetching user workouts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch workouts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Create new workout
  async createWorkout(req, res) {
    try {
      const { error, value } = validateWorkout(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid workout data',
          errors: error.details.map(detail => detail.message)
        });
      }

      const userId = req.user.id;
      const workout = await workoutService.createWorkout({ ...value, created_by_user_id: userId });

      res.status(201).json({
        success: true,
        data: workout,
        message: 'Workout created successfully'
      });
    } catch (error) {
      console.error('Error creating workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get workout by ID
  async getWorkoutById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const workout = await workoutService.getWorkoutById(id, userId);

      if (!workout) {
        return res.status(404).json({
          success: false,
          message: 'Workout not found'
        });
      }

      res.json({
        success: true,
        data: workout
      });
    } catch (error) {
      console.error('Error fetching workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Update workout
  async updateWorkout(req, res) {
    try {
      const { error, value } = validateWorkoutUpdate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid workout data',
          errors: error.details.map(detail => detail.message)
        });
      }

      const { id } = req.params;
      const userId = req.user.id;
      const workout = await workoutService.updateWorkout(id, value, userId);

      if (!workout) {
        return res.status(404).json({
          success: false,
          message: 'Workout not found'
        });
      }

      res.json({
        success: true,
        data: workout,
        message: 'Workout updated successfully'
      });
    } catch (error) {
      console.error('Error updating workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Delete workout
  async deleteWorkout(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const deleted = await workoutService.deleteWorkout(id, userId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Workout not found'
        });
      }

      res.json({
        success: true,
        message: 'Workout deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Publish workout to community
  async publishWorkout(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { tags, description } = req.body;

      const workout = await workoutService.publishWorkout(id, userId, { tags, description });

      if (!workout) {
        return res.status(404).json({
          success: false,
          message: 'Workout not found'
        });
      }

      res.json({
        success: true,
        data: workout,
        message: 'Workout published to community successfully'
      });
    } catch (error) {
      console.error('Error publishing workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to publish workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Unpublish workout from community
  async unpublishWorkout(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const workout = await workoutService.unpublishWorkout(id, userId);

      if (!workout) {
        return res.status(404).json({
          success: false,
          message: 'Workout not found'
        });
      }

      res.json({
        success: true,
        data: workout,
        message: 'Workout unpublished from community'
      });
    } catch (error) {
      console.error('Error unpublishing workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to unpublish workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Like/unlike workout
  async likeWorkout(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await workoutService.likeWorkout(id, userId);

      res.json({
        success: true,
        data: result,
        message: 'Workout liked successfully'
      });
    } catch (error) {
      console.error('Error liking workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to like workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async unlikeWorkout(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await workoutService.unlikeWorkout(id, userId);

      res.json({
        success: true,
        data: result,
        message: 'Workout unliked successfully'
      });
    } catch (error) {
      console.error('Error unliking workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to unlike workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Copy community workout to user's workouts
  async copyWorkout(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const copiedWorkout = await workoutService.copyWorkout(id, userId);

      if (!copiedWorkout) {
        return res.status(404).json({
          success: false,
          message: 'Workout not found'
        });
      }

      res.status(201).json({
        success: true,
        data: copiedWorkout,
        message: 'Workout copied to your collection successfully'
      });
    } catch (error) {
      console.error('Error copying workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to copy workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Rate workout
  async rateWorkout(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { rating, review } = req.body;

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5'
        });
      }

      const result = await workoutService.rateWorkout(id, userId, { rating, review });

      res.json({
        success: true,
        data: result,
        message: 'Workout rated successfully'
      });
    } catch (error) {
      console.error('Error rating workout:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to rate workout',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get workout ratings
  async getWorkoutRatings(req, res) {
    try {
      const { id } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const result = await workoutService.getWorkoutRatings(id, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json({
        success: true,
        data: result.ratings,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          pages: result.pages
        }
      });
    } catch (error) {
      console.error('Error fetching workout ratings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch workout ratings',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = new WorkoutController();
