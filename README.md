# BuildFit - Fitness Tracking Application

**BuildFit** is a fitness tracking application designed to democratize the sharing of fitness regimes, track fitness progress, and keep users motivated on their fitness journey.

## 🚀 Quick Start

### **Current Status: Working Demo Available!**

This repository now includes a working web application that demonstrates core BuildFit features. Get started in 2 minutes:

```bash
# Clone and setup
git clone https://github.com/AniketTati/BuildFit.git
cd BuildFit
pip install -r requirements.txt

# Run the app
python app.py

# Visit http://localhost:5000
```

**Live Demo Features:**
- ✅ Create and view workout plans
- ✅ User registration and management  
- ✅ Progress tracking and logging
- ✅ REST API for integrations
- ✅ Web dashboard interface

## 🎯 Core Features

- **Custom Workout Plans**: Design personalized workout routines
- **Progress Tracking**: Log workouts and monitor progress over time  
- **User Management**: Register users and track their fitness journey
- **Community Ready**: Foundation for sharing workout plans
- **API-First**: RESTful API for mobile app integration

## 🛠️ Tech Stack

**Current Implementation:**
- **Backend**: Python Flask with REST API
- **Frontend**: HTML/CSS/JavaScript with Bootstrap
- **Database**: In-memory (demo) - ready for PostgreSQL/MySQL
- **Deployment**: Docker containerization
- **Testing**: Pytest with comprehensive test suite

**Future Expansion:**
- **Mobile Apps**: Flutter or React Native  
- **Database**: PostgreSQL for production
- **Authentication**: OAuth and social login
- **Real-time**: WebSocket for live features

## 📁 Project Structure

```
BuildFit/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies  
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Container orchestration
├── SETUP.md              # Detailed setup instructions
├── templates/            # Web interface
├── static/              # CSS/JS assets
├── tests/               # Comprehensive test suite
├── scripts/             # Project management tools
└── docs/                # Comprehensive project planning
```

## 🚀 Deployment Options

### Local Development
```bash
# Quick start
python app.py

# With custom port
PORT=8080 python app.py
```

### Docker Deployment
```bash
# Simple deployment
docker-compose up --build

# Production with nginx
docker-compose --profile production up -d
```

### Testing
```bash
# Run all tests
python -m pytest tests/ -v

# Run with coverage
python -m pytest tests/ --cov=app
```

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Comprehensive setup and deployment guide
- **[API Documentation](#api-endpoints)** - REST API reference
- **[Project Planning](docs/)** - Detailed roadmap and task tracking

## 🔗 API Endpoints

### Health Check
```
GET /health
```

### Workouts
```
GET /api/workouts           # List all workouts
POST /api/workouts          # Create new workout
```

### Users  
```
POST /api/users             # Create user
GET /api/users/{username}/progress    # Get user progress
POST /api/users/{username}/progress   # Log workout completion
```

## 🧪 Testing

The application includes comprehensive tests covering:
- ✅ API endpoints and responses
- ✅ User management functionality  
- ✅ Workout creation and tracking
- ✅ Progress logging and retrieval
- ✅ Error handling and edge cases

Run tests with: `python -m pytest tests/ -v`

## 🎯 Getting Started for Contributors

1. **Review the working demo** - Run the app locally to understand current features
2. **Check the documentation** - Read [SETUP.md](SETUP.md) for detailed instructions  
3. **Explore the codebase** - Well-documented and tested Python Flask application
4. **Run the tests** - Ensure your environment is set up correctly
5. **Check project planning** - See [docs/](docs/) for comprehensive roadmap and tasks

## 📋 Project Organization & Task Management

This project uses a comprehensive task management system to track development progress across all areas. For detailed project planning and task assignments, see:

### 🗺️ Project Planning
- **[Project Roadmap](PROJECT_ROADMAP.md)** - Complete project timeline and phases
- **[Task Assignment & Tracking](docs/TASK_TRACKING.md)** - Team assignments and progress monitoring

### 📊 Detailed Task Lists
- **[Core Features & Modules](docs/tasks/CORE_FEATURES.md)** - Authentication, workout builder, progress tracking
- **[UI/UX Design Tasks](docs/tasks/UI_UX_TASKS.md)** - Design system, wireframes, visual design
- **[Backend Setup & Integration](docs/tasks/BACKEND_TASKS.md)** - API development, database, infrastructure
- **[Testing & QA](docs/tasks/TESTING_TASKS.md)** - Unit testing, integration testing, user acceptance
- **[Deployment & Release](docs/tasks/DEPLOYMENT_TASKS.md)** - App store preparation, launch strategy

### 🎯 Getting Started
1. Review the working demo application (this provides immediate value!)
2. Check [SETUP.md](SETUP.md) for development environment setup
3. Review the [Project Roadmap](PROJECT_ROADMAP.md) for overall timeline
4. Check [Task Tracking](docs/TASK_TRACKING.md) for current assignments
5. Pick up tasks from your team's category based on current sprint

### 📈 Progress Tracking
- **Total Tasks**: 250+ across all categories
- **Estimated Timeline**: 20+ weeks
- **Team Size**: 6-8 members recommended  
- **Current Phase**: Foundation complete ✅ - Ready for feature development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with tests
4. Run the test suite: `python -m pytest tests/ -v`
5. Submit a pull request

## 📄 License

This project is open source. See the repository for license details.

---

**Ready to build fitness together? Start with the working demo and let's make BuildFit amazing! 💪**