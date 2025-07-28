const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { authenticateToken } = require('../middleware/auth');

// Community workout routes (public access for browsing)
router.get('/community', workoutController.getCommunityWorkouts);
router.get('/community/:id', workoutController.getCommunityWorkoutById);

// Protected routes (require authentication)
router.use(authenticateToken); // All routes below require authentication

// User workout management
router.get('/', workoutController.getUserWorkouts);
router.post('/', workoutController.createWorkout);
router.get('/:id', workoutController.getWorkoutById);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

// Community actions
router.post('/:id/publish', workoutController.publishWorkout);
router.post('/:id/unpublish', workoutController.unpublishWorkout);
router.post('/:id/like', workoutController.likeWorkout);
router.delete('/:id/like', workoutController.unlikeWorkout);
router.post('/:id/copy', workoutController.copyWorkout);

// Workout ratings and reviews
router.post('/:id/rate', workoutController.rateWorkout);
router.get('/:id/ratings', workoutController.getWorkoutRatings);

module.exports = router;
