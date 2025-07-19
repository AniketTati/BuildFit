// BuildFit Demo JavaScript

// Check API status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkApiStatus();
});

// Check if API is working
async function checkApiStatus() {
    try {
        const response = await fetch('/health');
        const data = await response.json();
        if (data.status === 'healthy') {
            document.getElementById('api-status').textContent = 'Online';
            document.getElementById('api-status').parentElement.className = 'card text-white bg-success';
        } else {
            throw new Error('API not healthy');
        }
    } catch (error) {
        document.getElementById('api-status').textContent = 'Offline';
        document.getElementById('api-status').parentElement.className = 'card text-white bg-danger';
    }
}

// Handle user creation form
document.getElementById('create-user-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email })
        });
        
        if (response.ok) {
            const user = await response.json();
            alert(`User ${user.username} created successfully!`);
            this.reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        alert('Failed to create user. Please try again.');
    }
});

// Handle progress form
document.getElementById('progress-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('progress-username').value;
    
    try {
        const response = await fetch(`/api/users/${username}/progress`);
        const resultDiv = document.getElementById('progress-result');
        
        if (response.ok) {
            const data = await response.json();
            resultDiv.innerHTML = `
                <div class="alert alert-success">
                    <strong>${data.username}</strong><br>
                    Workouts completed: ${data.workouts_completed}<br>
                    <small>Progress entries: ${data.progress.length}</small>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="alert alert-warning">
                    User not found
                </div>
            `;
        }
    } catch (error) {
        document.getElementById('progress-result').innerHTML = `
            <div class="alert alert-danger">
                Error checking progress
            </div>
        `;
    }
});

// Complete workout function
async function completeWorkout(workoutId, workoutName) {
    const username = prompt(`Enter your username to complete "${workoutName}":`);
    if (!username) return;
    
    try {
        const response = await fetch(`/api/users/${username}/progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                workout_id: workoutId,
                notes: `Completed ${workoutName}`
            })
        });
        
        if (response.ok) {
            alert(`Great job completing "${workoutName}"!`);
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        alert('Failed to log workout. Please try again.');
    }
}