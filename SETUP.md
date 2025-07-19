# BuildFit - Setup & Development Guide

## Quick Start

### Prerequisites
- Python 3.11+ 
- Docker (optional, for containerized deployment)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AniketTati/BuildFit.git
   cd BuildFit
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   # Development mode
   python app.py
   
   # Production mode
   gunicorn --bind 0.0.0.0:5000 app:app
   ```

4. **Access the application**
   - Web interface: http://localhost:5000
   - API documentation: See [API Reference](#api-reference) below

### Testing

Run the test suite to verify everything is working:

```bash
# Run all tests
python -m pytest tests/ -v

# Run tests with coverage
python -m pytest tests/ --cov=app --cov-report=html

# Run specific test class
python -m pytest tests/test_app.py::TestWorkoutAPI -v
```

### Docker Deployment

#### Quick Docker Setup
```bash
# Build and run with Docker Compose
docker-compose up --build

# Access application at http://localhost:5000
```

#### Manual Docker Commands
```bash
# Build image
docker build -t buildfit .

# Run container
docker run -p 5000:5000 buildfit

# With environment variables
docker run -p 5000:5000 -e FLASK_ENV=production buildfit
```

## Project Structure

```
BuildFit/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── nginx.conf             # Nginx configuration (for production)
├── templates/             # HTML templates
│   └── index.html         # Main web interface
├── static/                # Static assets
│   ├── css/style.css      # Custom styles
│   └── js/app.js          # Frontend JavaScript
├── tests/                 # Test suite
│   ├── __init__.py
│   └── test_app.py        # Main test file
├── scripts/               # Project management scripts
│   ├── generate_github_issues.py
│   └── ...
└── docs/                  # Project documentation
    └── ...
```

## Features

This BuildFit demo application includes:

### Core Features
- ✅ **Workout Management**: Create and view workout plans
- ✅ **User Management**: Register users and track profiles  
- ✅ **Progress Tracking**: Log completed workouts and view progress
- ✅ **REST API**: Full API for mobile/external integrations
- ✅ **Web Interface**: User-friendly web dashboard

### Technical Features
- ✅ **Flask Web Framework**: Lightweight and scalable
- ✅ **RESTful API**: JSON endpoints for all operations
- ✅ **Docker Support**: Containerized deployment
- ✅ **Test Suite**: Comprehensive testing with pytest
- ✅ **Health Monitoring**: Built-in health checks
- ✅ **CORS Support**: Cross-origin resource sharing enabled

## API Reference

### Health Check
```bash
GET /health
# Returns: {"status": "healthy", "timestamp": "...", "version": "1.0.0"}
```

### Workouts
```bash
# Get all workouts
GET /api/workouts

# Create new workout
POST /api/workouts
Content-Type: application/json
{
  "name": "My Workout",
  "exercises": [
    {"name": "Push-ups", "sets": 3, "reps": 10},
    {"name": "Squats", "sets": 3, "reps": 15}
  ],
  "creator": "username"
}
```

### Users
```bash
# Create user
POST /api/users
Content-Type: application/json
{
  "username": "johndoe",
  "email": "john@example.com"
}
```

### Progress Tracking
```bash
# Log workout completion
POST /api/users/{username}/progress
Content-Type: application/json
{
  "workout_id": 1,
  "notes": "Great workout!"
}

# Get user progress
GET /api/users/{username}/progress
```

## Development Guidelines

### Code Style
- Follow PEP 8 for Python code
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions small and focused

### Testing
- Write tests for all new features
- Maintain test coverage above 80%
- Test both success and error scenarios
- Use descriptive test names

### Adding New Features

1. **Create tests first** (TDD approach)
2. **Implement the feature**
3. **Update documentation**
4. **Run full test suite**
5. **Update API documentation if needed**

## Deployment Options

### Local Development
- Use `python app.py` for development
- Automatic reloading enabled in development mode
- Debug mode provides detailed error messages

### Production Deployment

#### Option 1: Docker (Recommended)
```bash
# Simple deployment
docker-compose up -d

# With reverse proxy (production)
docker-compose --profile production up -d
```

#### Option 2: Manual Production Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Run with Gunicorn
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app

# Or with systemd service (see deployment docs)
```

#### Option 3: Platform as a Service
Deploy to platforms like:
- Heroku: `git push heroku main`
- Google Cloud Run: Use included Dockerfile
- AWS ECS: Use docker-compose configuration
- DigitalOcean App Platform: Use Dockerfile

### Environment Variables

Set these environment variables for production:

```bash
FLASK_ENV=production          # Set to production
PORT=5000                     # Port to run on
WORKERS=4                     # Number of worker processes (for gunicorn)
```

### Health Monitoring

The application includes built-in health checks:

- **Endpoint**: `/health`
- **Docker Health Check**: Automatic container health monitoring
- **Response**: JSON with status, timestamp, and version

### Scaling Considerations

For production use, consider:

1. **Database**: Replace in-memory storage with PostgreSQL/MySQL
2. **Session Management**: Add Redis for session storage
3. **Load Balancing**: Use nginx or cloud load balancers
4. **Logging**: Implement structured logging
5. **Monitoring**: Add application monitoring (Prometheus, DataDog, etc.)

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process or use different port
export PORT=5001
python app.py
```

#### Dependencies Issues
```bash
# Clean install
pip uninstall -r requirements.txt -y
pip install -r requirements.txt
```

#### Docker Issues
```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Getting Help

1. **Check the logs**: Application logs show detailed error information
2. **Run tests**: `python -m pytest tests/ -v` to verify setup
3. **Health check**: Visit `/health` endpoint to verify service status
4. **Documentation**: Review API documentation and code comments

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with tests
4. Run the test suite: `python -m pytest tests/ -v`
5. Submit a pull request

### Development Workflow
1. Set up development environment
2. Write tests for new features
3. Implement features
4. Ensure all tests pass
5. Update documentation
6. Submit pull request

---

**Next Steps**: This is a minimal working version. See the comprehensive project planning in `docs/` for the full BuildFit application roadmap.