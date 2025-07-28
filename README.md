# BuildFit

**A professional mobile fitness tracking and community platform**

BuildFit is a cross-platform mobile application that enables users to create custom workouts, track fitness progress, and share workout routines with a vibrant community.

## � Current Status (95% Complete)

### ✅ Completed Features
- **Authentication System** - JWT with secure login/register
- **Workout Builder** - Create custom workouts with 80+ exercises
- **Workout Execution** - Real-time workout guidance with timers
- **Template System** - Save and reuse workout templates
- **Community Features** - Browse, publish, and discover workouts
- **Backend API** - Complete REST API with validation
- **Database** - PostgreSQL with migrations and seeding

### 🔄 Next Priority
- **Analytics & Calendar** - Progress tracking, workout history, streaks

## 🏗️ Project Structure

```
BuildFit/
├── mobile/                 # React Native mobile app
├── backend/               # Node.js Express API server  
├── shared/                # Shared types and utilities
├── docs/                  # Documentation
│   ├── DEVELOPMENT_GUIDE.md # Complete technical guide
│   └── PROJECT_ROADMAP.md   # Progress and planning
└── README.md              # Project overview
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+ 
- React Native development environment
- Android Studio (for Android) / Xcode (for iOS, macOS only)

### Setup
```bash
# Clone and setup
git clone [repository]
cd BuildFit

# Backend setup
cd backend
npm install
cp .env.example .env    # Configure database
npm run migrate
npm run dev

# Mobile setup (new terminal)
cd mobile  
npm install
npm start              # Metro bundler
npm run android        # or npm run ios
```

## 🛠️ Technology Stack

**Mobile:** React Native, Redux Toolkit, React Navigation  
**Backend:** Node.js, Express, PostgreSQL, JWT Authentication  
**Shared:** TypeScript, ESLint, Prettier

## 📱 Key Features

- **Workout Builder** - 80+ exercises, custom routines, advanced filtering
- **Real-time Execution** - Live workout guidance with timers and progression
- **Community Platform** - Browse, publish, and discover workouts
- **Template System** - Save and reuse favorite workout templates
- **Progress Tracking** - Analytics and performance insights *(coming soon)*

## 📖 Documentation

- **[Development Guide](docs/DEVELOPMENT_GUIDE.md)** - Complete technical documentation
- **[Project Roadmap](docs/PROJECT_ROADMAP.md)** - Progress tracking and planning
- **[Backend README](backend/README.md)** - API endpoints and backend details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
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

## 📊 Progress

- **Current Phase**: Community Features & Analytics (Next Development)
- **Foundation**: 100% complete ✅
- **Authentication & Navigation**: 100% complete ✅
- **Workout Execution Engine**: 100% complete ✅ 🎉
- **Workout Builder System**: 100% complete ✅ 🎉
- **Community Workout Features**: 100% complete ✅ 🎉
- **Overall Progress**: 95% complete
- **Current Sprint**: 7 (Community Features Complete)
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
- ✅ **Workout Execution Engine** - Live workout sessions with step-by-step guidance 🎉
- ✅ **WorkoutSessionScreen** - Real-time exercise timers and progression controls
- ✅ **Session Management** - Pause/resume/complete with state persistence
- ✅ **Post-Workout Feedback** - Difficulty rating and completion tracking
- ✅ **Comprehensive Workout Builder** - Create custom workouts with 80+ exercises 🎉
- ✅ **Exercise Database Integration** - Advanced search, filtering, and custom exercise creation
- ✅ **Workout Template System** - Save, manage, and reuse workout templates
- ✅ **Community Workout Features** - Browse, publish, and discover community workouts 🎉

### Currently Active (Sprint 7: July 29 - Aug 11, 2025)
- ✅ Workout builder interface (WorkoutBuilderScreen, exercise picker, configuration) - **COMPLETED**
- ✅ Custom workout creation (reps/sets/time/rest configuration) - **COMPLETED**
- ✅ Exercise database integration and selection system - **COMPLETED**
- ✅ Workout template saving and management - **COMPLETED**
- ✅ Workout preview and testing functionality - **COMPLETED**
- ✅ Community workout browsing and discovery - **COMPLETED**
- ✅ Workout publishing and sharing system - **COMPLETED**
- ✅ Backend API for community features - **COMPLETED**

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
