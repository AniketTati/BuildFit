#!/usr/bin/env python3
"""
BuildFit - Minimal Working Application
A simple web application demonstrating the BuildFit fitness tracking concept.
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)
CORS(app)

# Simple in-memory data storage (for demo purposes)
users = {}
workouts = []
user_progress = {}

class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.created_at = datetime.now().isoformat()
        self.workouts_completed = 0

class Workout:
    def __init__(self, name, exercises, creator="system"):
        self.id = len(workouts) + 1
        self.name = name
        self.exercises = exercises
        self.creator = creator
        self.created_at = datetime.now().isoformat()

# Initialize with sample data
def init_sample_data():
    # Sample workouts
    sample_workouts = [
        Workout("Beginner Full Body", [
            {"name": "Push-ups", "sets": 3, "reps": 10},
            {"name": "Squats", "sets": 3, "reps": 15},
            {"name": "Plank", "sets": 3, "duration": "30 seconds"}
        ]),
        Workout("Cardio Blast", [
            {"name": "Jumping Jacks", "sets": 3, "reps": 20},
            {"name": "High Knees", "sets": 3, "duration": "30 seconds"},
            {"name": "Burpees", "sets": 3, "reps": 8}
        ])
    ]
    workouts.extend(sample_workouts)

@app.route('/')
def home():
    """Main dashboard showing workouts and progress"""
    return render_template('index.html', 
                         workouts=workouts, 
                         total_users=len(users),
                         total_workouts=len(workouts))

@app.route('/api/workouts')
def api_workouts():
    """API endpoint to get all workouts"""
    return jsonify([{
        'id': w.id,
        'name': w.name,
        'exercises': w.exercises,
        'creator': w.creator,
        'created_at': w.created_at
    } for w in workouts])

@app.route('/api/workouts', methods=['POST'])
def api_create_workout():
    """API endpoint to create a new workout"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'exercises' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    workout = Workout(data['name'], data['exercises'], data.get('creator', 'anonymous'))
    workouts.append(workout)
    
    return jsonify({
        'id': workout.id,
        'name': workout.name,
        'exercises': workout.exercises,
        'creator': workout.creator,
        'created_at': workout.created_at
    }), 201

@app.route('/api/users', methods=['POST'])
def api_create_user():
    """API endpoint to create a new user"""
    data = request.get_json()
    
    if not data or 'username' not in data or 'email' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if data['username'] in users:
        return jsonify({'error': 'Username already exists'}), 400
    
    user = User(data['username'], data['email'])
    users[data['username']] = user
    
    return jsonify({
        'username': user.username,
        'email': user.email,
        'created_at': user.created_at,
        'workouts_completed': user.workouts_completed
    }), 201

@app.route('/api/users/<username>/progress', methods=['POST'])
def api_log_progress(username):
    """API endpoint to log workout progress for a user"""
    if username not in users:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    if not data or 'workout_id' not in data:
        return jsonify({'error': 'Missing workout_id'}), 400
    
    # Log the progress
    if username not in user_progress:
        user_progress[username] = []
    
    progress_entry = {
        'workout_id': data['workout_id'],
        'completed_at': datetime.now().isoformat(),
        'notes': data.get('notes', '')
    }
    
    user_progress[username].append(progress_entry)
    users[username].workouts_completed += 1
    
    return jsonify(progress_entry), 201

@app.route('/api/users/<username>/progress')
def api_get_progress(username):
    """API endpoint to get user's workout progress"""
    if username not in users:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'username': username,
        'workouts_completed': users[username].workouts_completed,
        'progress': user_progress.get(username, [])
    })

@app.route('/health')
def health_check():
    """Health check endpoint for deployment monitoring"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Initialize sample data
    init_sample_data()
    
    # Run the application
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    app.run(host='0.0.0.0', port=port, debug=debug)