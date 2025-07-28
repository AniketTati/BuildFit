// Community Workout API Service
const API_BASE_URL = 'http://localhost:3000/api/v1';

class CommunityWorkoutAPI {
  // Get community workouts with filtering
  static async getCommunityWorkouts(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);
      if (filters.category && filters.category !== 'All') queryParams.append('category', filters.category);
      if (filters.difficulty && filters.difficulty !== 'All') queryParams.append('difficulty', filters.difficulty);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.search) queryParams.append('search', filters.search);

      const url = `${API_BASE_URL}/workouts/community?${queryParams.toString()}`;
      console.log('Fetching community workouts from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching community workouts:', error);
      throw error;
    }
  }

  // Get specific community workout by ID
  static async getCommunityWorkoutById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/community/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching community workout:', error);
      throw error;
    }
  }

  // Publish workout to community (requires authentication)
  static async publishWorkout(workoutId, publishInfo, authToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(publishInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error publishing workout:', error);
      throw error;
    }
  }

  // Copy community workout to user's collection (requires authentication)
  static async copyWorkout(workoutId, authToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}/copy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error copying workout:', error);
      throw error;
    }
  }

  // Like/unlike workout (requires authentication)
  static async likeWorkout(workoutId, authToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error liking workout:', error);
      throw error;
    }
  }

  static async unlikeWorkout(workoutId, authToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}/like`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error unliking workout:', error);
      throw error;
    }
  }

  // Create new workout (requires authentication)
  static async createWorkout(workoutData, authToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
    }
  }

  // Get user's workouts (requires authentication)
  static async getUserWorkouts(authToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user workouts:', error);
      throw error;
    }
  }
}

export default CommunityWorkoutAPI;
