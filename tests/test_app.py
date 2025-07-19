#!/usr/bin/env python3
"""
Test suite for BuildFit application
"""

import pytest
import json
from app import app, init_sample_data, users, workouts, user_progress

@pytest.fixture
def client():
    """Create a test client for the Flask app"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            # Clear data and initialize sample data for each test
            users.clear()
            workouts.clear()
            user_progress.clear()
            init_sample_data()
        yield client

class TestHealthCheck:
    """Test health check endpoint"""
    
    def test_health_endpoint(self, client):
        """Test health check returns proper status"""
        response = client.get('/health')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['status'] == 'healthy'
        assert 'timestamp' in data
        assert 'version' in data

class TestWorkoutAPI:
    """Test workout-related endpoints"""
    
    def test_get_workouts(self, client):
        """Test getting all workouts"""
        response = client.get('/api/workouts')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert len(data) == 2  # Sample data has 2 workouts
        assert data[0]['name'] == 'Beginner Full Body'
        assert 'exercises' in data[0]
    
    def test_create_workout(self, client):
        """Test creating a new workout"""
        workout_data = {
            'name': 'Test Workout',
            'exercises': [
                {'name': 'Test Exercise', 'sets': 3, 'reps': 10}
            ],
            'creator': 'test_user'
        }
        
        response = client.post('/api/workouts', 
                             data=json.dumps(workout_data),
                             content_type='application/json')
        assert response.status_code == 201
        
        data = json.loads(response.data)
        assert data['name'] == 'Test Workout'
        assert data['creator'] == 'test_user'
        assert len(data['exercises']) == 1
    
    def test_create_workout_missing_data(self, client):
        """Test creating workout with missing required fields"""
        response = client.post('/api/workouts', 
                             data=json.dumps({'name': 'Incomplete'}),
                             content_type='application/json')
        assert response.status_code == 400
        
        data = json.loads(response.data)
        assert 'error' in data

class TestUserAPI:
    """Test user-related endpoints"""
    
    def test_create_user(self, client):
        """Test creating a new user"""
        user_data = {
            'username': 'testuser',
            'email': 'test@example.com'
        }
        
        response = client.post('/api/users',
                             data=json.dumps(user_data),
                             content_type='application/json')
        assert response.status_code == 201
        
        data = json.loads(response.data)
        assert data['username'] == 'testuser'
        assert data['email'] == 'test@example.com'
        assert data['workouts_completed'] == 0
    
    def test_create_duplicate_user(self, client):
        """Test creating user with existing username"""
        user_data = {
            'username': 'testuser',
            'email': 'test@example.com'
        }
        
        # Create user first time
        client.post('/api/users',
                   data=json.dumps(user_data),
                   content_type='application/json')
        
        # Try to create same user again
        response = client.post('/api/users',
                             data=json.dumps(user_data),
                             content_type='application/json')
        assert response.status_code == 400
        
        data = json.loads(response.data)
        assert 'already exists' in data['error']
    
    def test_create_user_missing_data(self, client):
        """Test creating user with missing required fields"""
        response = client.post('/api/users',
                             data=json.dumps({'username': 'incomplete'}),
                             content_type='application/json')
        assert response.status_code == 400

class TestProgressAPI:
    """Test progress tracking endpoints"""
    
    def test_log_progress(self, client):
        """Test logging workout progress for a user"""
        # Create a user first
        user_data = {'username': 'testuser', 'email': 'test@example.com'}
        client.post('/api/users',
                   data=json.dumps(user_data),
                   content_type='application/json')
        
        # Log progress
        progress_data = {
            'workout_id': 1,
            'notes': 'Great workout!'
        }
        
        response = client.post('/api/users/testuser/progress',
                             data=json.dumps(progress_data),
                             content_type='application/json')
        assert response.status_code == 201
        
        data = json.loads(response.data)
        assert data['workout_id'] == 1
        assert data['notes'] == 'Great workout!'
        assert 'completed_at' in data
    
    def test_log_progress_nonexistent_user(self, client):
        """Test logging progress for non-existent user"""
        progress_data = {'workout_id': 1}
        
        response = client.post('/api/users/nonexistent/progress',
                             data=json.dumps(progress_data),
                             content_type='application/json')
        assert response.status_code == 404
    
    def test_get_progress(self, client):
        """Test getting user progress"""
        # Create user and log progress
        user_data = {'username': 'testuser', 'email': 'test@example.com'}
        client.post('/api/users',
                   data=json.dumps(user_data),
                   content_type='application/json')
        
        progress_data = {'workout_id': 1, 'notes': 'Test workout'}
        client.post('/api/users/testuser/progress',
                   data=json.dumps(progress_data),
                   content_type='application/json')
        
        # Get progress
        response = client.get('/api/users/testuser/progress')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['username'] == 'testuser'
        assert data['workouts_completed'] == 1
        assert len(data['progress']) == 1
    
    def test_get_progress_nonexistent_user(self, client):
        """Test getting progress for non-existent user"""
        response = client.get('/api/users/nonexistent/progress')
        assert response.status_code == 404

class TestWebPages:
    """Test web page rendering"""
    
    def test_home_page(self, client):
        """Test home page loads correctly"""
        response = client.get('/')
        assert response.status_code == 200
        assert b'BuildFit' in response.data
        assert b'Beginner Full Body' in response.data

class TestErrorHandling:
    """Test error handling"""
    
    def test_404_error(self, client):
        """Test 404 error handling"""
        response = client.get('/nonexistent-endpoint')
        assert response.status_code == 404
        
        data = json.loads(response.data)
        assert 'error' in data

if __name__ == '__main__':
    pytest.main([__file__, '-v'])