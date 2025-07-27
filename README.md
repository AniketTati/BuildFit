# BuildFit

**BuildFit** is a cross-platform mobile application designed to democratize fitness regime sharing, track fitness progress, and maintain user motivation throughout their fitness### Next Sprint Priorities (Sprint 7-8: Aug 29 - Sep 11, 2025)
- 📋 Community workout sharing and discovery features
- 📋 Exercise database seeding with comprehensive data
- 📋 Advanced analytics and progress visualization
- 📋 Social features (follow users, like workouts)
- 📋 Performance optimization and testingey.

## 🏗️ Project Structure

```
BuildFit/
├── mobile/                 # React Native mobile application
│   ├── src/               # Mobile app source code
│   ├── config/            # App configuration
│   └── README.md          # Mobile app documentation
├── backend/               # Node.js Express API server
│   ├── src/               # Backend source code
│   └── README.md          # Backend documentation
├── shared/                # Shared code between mobile and backend
│   ├── types/             # TypeScript type definitions
│   ├── constants/         # Shared constants and enums
│   └── utils/             # Shared utility functions
├── docs/                  # Project documentation
│   ├── DEVELOPMENT_GUIDE.md # Complete development guide
│   └── PROJECT_ROADMAP.md   # Roadmap and progress
├── setup.sh / setup.bat   # Automated setup scripts
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16 or higher
- **PostgreSQL** 12 or higher (for backend)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)

### Setup

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd BuildFit
   
   # Run setup script
   ./setup.sh      # Linux/macOS
   ./setup.bat     # Windows
   ```

2. **Backend setup**:
   ```bash
   cd backend
   # Edit .env with your database credentials
   npm run migrate
   npm run dev
   ```

3. **Mobile app setup**:
   ```bash
   cd mobile
   npm start       # Start Metro bundler
   npm run android # Run on Android (new terminal)
   npm run ios     # Run on iOS (macOS only)
   ```

## 🛠️ Technology Stack

### Mobile App
- **Framework**: React Native 0.72+
- **Language**: JavaScript/TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **UI**: Custom component library
- **Testing**: Jest + React Native Testing Library

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: PostgreSQL + Knex.js
- **Authentication**: JWT
- **Validation**: Joi
- **Testing**: Jest + Supertest

### Shared
- **Types**: TypeScript
- **Constants**: Environment-agnostic constants
- **Utils**: Cross-platform utility functions

## 📱 Features

### Core Features
- **Custom Workout Plans**: Design personalized workout routines
- **Exercise Library**: Comprehensive database with instructions and videos
- **Progress Tracking**: Log workouts and monitor progress over time
- **Community Sharing**: Access and share workout plans with the community
- **Analytics**: Visual progress charts and performance insights
- **Social Features**: Follow friends, share achievements, motivation

### Planned Features
- **AI Workout Recommendations**: Personalized suggestions based on goals
- **Nutrition Tracking**: Meal planning and calorie tracking
- **Wearable Integration**: Sync with fitness trackers and smartwatches
- **Virtual Personal Trainer**: Guided workout sessions
- **Challenges**: Community challenges and competitions

## 📋 Development

### Project Organization

This project follows a monorepo structure with clear separation of concerns:

- **`mobile/`**: Contains the React Native mobile application
- **`backend/`**: Contains the Node.js API server
- **`shared/`**: Contains code shared between mobile and backend
- **`docs/`**: Contains all project documentation and planning

### Development Workflow

1. **Pick a task** from the [Task Reference](docs/TASK_REFERENCE.md)
2. **Create a feature branch**: `feature/TASK-ID-description`
3. **Follow guidelines** in the [Development Guide](docs/DEVELOPMENT_GUIDE.md)
4. **Test your changes** with provided test suites
5. **Submit a pull request** with clear description

### Code Quality

- **ESLint + Prettier** for consistent code formatting
- **TypeScript** for type safety
- **Jest** for comprehensive testing
- **Husky** for pre-commit hooks (planned)
- **Conventional Commits** for clear commit messages

## 🧪 Testing

```bash
# Mobile app tests
cd mobile
npm test

# Backend tests
cd backend
npm test

# Run all tests
npm run test:all  # (from root)
```

## 🚀 Deployment

### Mobile App
- **Android**: Generate AAB for Google Play Store
- **iOS**: Archive and submit to App Store Connect

### Backend
- **Staging**: Automated deployment on merge to `develop`
- **Production**: Manual deployment from `main` branch
- **Infrastructure**: Docker containers on cloud platform

## 📚 Documentation

- **[Development Guide](docs/DEVELOPMENT_GUIDE.md)** - Complete setup, development instructions, and detailed feature specifications
- **[Project Roadmap](docs/PROJECT_ROADMAP.md)** - Timeline, progress, and next steps
- **[Task Reference](docs/TASK_REFERENCE.md)** - Detailed task breakdowns and sprint planning reference
- **[Mobile App](mobile/README.md)** - React Native app documentation
- **[Backend API](backend/README.md)** - Server setup and API documentation

## 📊 Progress

- **Current Phase**: Core Workout Features (Ready to Start)
- **Foundation**: 100% complete ✅
- **Authentication & Navigation**: 100% complete ✅
- **Overall Progress**: 75% complete
- **Current Sprint**: 5-6 (Core Workout Features)
- **Team Size**: 6-8 developers recommended

### Recent Completions
- ✅ Complete monorepo structure and development environment
- ✅ Mobile app foundation with React Native 0.72 and dependencies
- ✅ Backend API foundation with Express.js and security middleware
- ✅ Comprehensive database schema (users, exercises, workout_plans)
- ✅ Shared TypeScript types (320+ lines) and utilities
- ✅ Development tooling and automated setup scripts
- ✅ JWT authentication system with middleware and endpoints
- ✅ Complete React Navigation setup with authentication flow
- ✅ Redux store configuration with persistence and all slices
- ✅ All main mobile screens and navigation structure

### Currently Active (Sprint 5-6: Aug 15-28, 2025)
- 🔄 Workout execution engine (WorkoutSessionScreen, timers, session state)
- 🔄 Workout builder interface (creation, exercise picker, preview)
- 🔄 Workout calendar and analytics (calendar view, stats, trends)
- 🔄 Progressive difficulty and user feedback systems
- 🔄 API integration for workout CRUD and session tracking

### Next Sprint Priorities (Sprint 5-6: Aug 15-28, 2025)
- � Exercise database seeding with comprehensive data
- 📋 Exercise management API endpoints
- 📋 Exercise browser and search UI screens
- 📋 Custom exercise creation functionality
- � Media upload system for exercise demonstrations

## 🤝 Contributing

1. **Read** the [Development Guide](docs/DEVELOPMENT_GUIDE.md) for development guidelines
2. **Check** existing tasks in [Task Reference](docs/TASK_REFERENCE.md)
3. **Follow** the established code style and patterns
4. **Write tests** for new features
5. **Update documentation** as needed

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@buildfit.app (planned)
- **Documentation**: [Wiki](../../wiki) (planned)

---

**BuildFit** - Your fitness journey starts here! 💪
