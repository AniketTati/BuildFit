# BuildFit Development Guide

## Project Overview

BuildFit is a cross-platform mobile application for fitness tracking and workout sharing. This document contains all essential development information.

## Quick Setup

### Prerequisites
- Node.js 16+
- PostgreSQL 12+ (for backend)
- Android Studio (for Android)
- Xcode (for iOS - macOS only)

### Installation
```bash
# Clone and install
git clone <repository-url>
cd BuildFit
npm install  # Installs both mobile and backend dependencies

# Backend setup
cd backend
cp .env.example .env  # Edit with your database credentials
npm run migrate
npm run dev

# Mobile setup (new terminal)
cd mobile
npm start       # Metro bundler
npm run android # or npm run ios
```

## Project Structure

```
BuildFit/
├── mobile/         # React Native app
├── backend/        # Node.js API server
├── shared/         # Cross-platform types and utilities
└── docs/           # Documentation
```

## Development Guidelines

### Code Organization
- Use path aliases: `@/components`, `@shared/types`
- Follow TypeScript for type safety
- Use shared utilities and constants
- Keep components small and focused

### Git Workflow
1. Create feature branch: `feature/description`
2. Make changes following existing patterns
3. Test your changes
4. Submit pull request

### Testing
```bash
# Mobile tests
cd mobile && npm test

# Backend tests  
cd backend && npm test
```

## Current Development Status

### Completed ✅
**Project Infrastructure**
- ✅ Professional monorepo structure
- ✅ Mobile app foundation (React Native 0.72)
- ✅ Backend API foundation (Express.js + PostgreSQL)
- ✅ Shared TypeScript types (320+ lines of type definitions)
- ✅ Development tooling (ESLint, Prettier, Jest)
- ✅ Package management and dependencies
- ✅ Environment setup scripts (setup.sh, setup.bat)

**Database & Backend**
- ✅ Database migrations system (Knex.js)
- ✅ User management schema with comprehensive fields
- ✅ Exercise database schema with metadata support
- ✅ Workout plans schema with relationships
- ✅ Express.js server with security middleware
- ✅ Database connection and configuration
- ✅ Backend folder structure (controllers, models, routes)

**Mobile App Foundation**
- ✅ React Native project setup with TypeScript
- ✅ Navigation dependencies (@react-navigation)
- ✅ State management setup (Redux Toolkit)
- ✅ UI libraries (vector icons, charts, forms)
- ✅ Basic components (Button, Input)
- ✅ Authentication screens (Login/Register forms)
- ✅ Home screen foundation

**Shared Code**
- ✅ Comprehensive TypeScript interfaces (User, Exercise, Workout, etc.)
- ✅ Shared constants (API config, fitness data, validation rules)
- ✅ Cross-platform utility functions
- ✅ Type-safe API response structures

### Next Priorities 🎯
**Immediate (Week 1-2: Aug 1-14, 2025)**
1. **Authentication Backend**: Complete JWT implementation, password hashing, user registration/login APIs
2. **Mobile Navigation**: Implement React Navigation with tab and stack navigators
3. **State Management**: Complete Redux store setup with auth slice and persistence
4. **API Integration**: Create HTTP client with authentication headers and error handling

**Short Term (Week 3-4: Aug 15-28, 2025)**  
1. **Exercise System**: Seed exercise database with initial data
2. **Exercise APIs**: Create CRUD endpoints for exercise management
3. **Exercise Screens**: Build exercise browser and search functionality
4. **Testing Foundation**: Set up unit and integration testing framework

**Medium Term (Week 5-8: Aug 29 - Sep 25, 2025)**
1. **Workout Builder**: Drag-and-drop workout creation interface
2. **Workout APIs**: Complete workout management endpoints
3. **Progress Tracking**: Session logging and analytics foundation
4. **Social Features**: User following and activity feed basics

### Key Features Planned
- Custom workout plan creation
- Exercise library with instructions
- Progress tracking and analytics
- Community workout sharing
- Social features and motivation

## Technology Stack

- **Mobile**: React Native, Redux, React Navigation
- **Backend**: Node.js, Express, PostgreSQL, Knex
- **Shared**: TypeScript, Joi validation
- **Tools**: ESLint, Prettier, Jest

## Contributing

1. Check current priorities above
2. Follow existing code patterns
3. Add tests for new features
4. Update documentation if needed
5. Keep commits focused and descriptive

---

## Detailed Feature Specifications

### 1. User Authentication & Profile Management

#### Authentication Features
- **Email/Password Registration**: Secure user registration with validation
- **Social Login**: Google and Apple OAuth integration
- **Password Reset**: Email-based password recovery
- **JWT Security**: Token-based authentication with refresh tokens
- **Profile Management**: Complete user profile CRUD operations

#### User Profile Features
- **Profile Creation**: Multi-step onboarding with fitness goals
- **Profile Customization**: Photo upload, personal details, fitness preferences
- **Privacy Settings**: Control over profile visibility and data sharing
- **Account Management**: Settings, preferences, and account deletion

### 2. Exercise Database & Management

#### Exercise Library
- **Comprehensive Database**: 100+ exercises across all muscle groups
- **Exercise Details**: Instructions, muscle groups, equipment requirements
- **Search & Filter**: Advanced filtering by muscle group, equipment, difficulty
- **Custom Exercises**: Users can create and share custom exercises
- **Media Support**: Images and video demonstrations

#### Exercise Features
- **Categorization**: Strength, cardio, flexibility, sports-specific
- **Equipment Tracking**: Bodyweight, dumbbells, barbells, machines
- **Difficulty Levels**: Beginner, intermediate, advanced
- **Muscle Group Mapping**: Primary and secondary muscle activation

### 3. Workout Plan Creator

#### Workout Builder
- **Drag-and-Drop Interface**: Intuitive workout creation
- **Exercise Selection**: Browse and add exercises to workout plans
- **Set Configuration**: Reps, sets, weight, time, rest periods
- **Workout Templates**: Pre-built plans for different goals
- **Plan Sharing**: Community sharing and rating system

#### Workout Management
- **Custom Plans**: Fully customizable workout routines
- **Schedule Integration**: Calendar-based workout planning
- **Workout History**: Track and repeat previous workouts
- **Plan Variations**: A/B workout splits, progression schemes
- **Export/Import**: Share workout plans externally

### 4. Progress Tracking System

#### Workout Logging
- **Real-time Logging**: Log exercises during workout sessions
- **Performance Tracking**: Weight, reps, time, distance metrics
- **Session Timer**: Built-in timer for exercises and rest periods
- **Quick Logging**: Streamlined input for faster data entry
- **Offline Support**: Log workouts without internet connection

#### Analytics & Progress
- **Progress Charts**: Visual representation of strength and endurance gains
- **Goal Setting**: SMART fitness goals with progress tracking
- **Body Measurements**: Weight, body fat, measurement tracking
- **Progress Photos**: Before/after photo comparisons
- **Performance Insights**: Trends, recommendations, achievements

### 5. Community & Social Features

#### Social Interactions
- **User Following**: Follow other users and see their activities
- **Activity Feed**: Real-time feed of followed users' workouts
- **Workout Sharing**: Share completed workouts and achievements
- **Plan Rating**: Rate and review shared workout plans
- **Comments & Likes**: Engage with community content

#### Community Features
- **Challenges**: Fitness challenges and competitions
- **Leaderboards**: Performance rankings and achievements
- **Groups**: Join fitness groups and communities
- **Mentorship**: Connect with trainers and experienced users
- **Success Stories**: Share and celebrate fitness journeys

### 6. Notification System

#### Push Notifications
- **Workout Reminders**: Scheduled workout notifications
- **Progress Milestones**: Achievement and goal completion alerts
- **Social Updates**: Friend activities and interactions
- **Motivational Messages**: Encouragement and tips
- **System Updates**: App updates and maintenance notifications

#### In-App Notifications
- **Real-time Updates**: Live activity feeds and interactions
- **Achievement Badges**: Visual rewards for milestones
- **Streak Tracking**: Workout consistency monitoring
- **Goal Reminders**: Progress check-ins and motivation

---

## Technical Implementation Details

### Database Schema Overview

#### Core Tables
- **Users**: Authentication, profile data, preferences
- **Exercises**: Exercise library with metadata
- **Workouts**: User-created workout plans
- **Sessions**: Individual workout session logs
- **Progress**: Measurements, photos, analytics data

#### Relationships
- User → Workouts (one-to-many)
- Workout → Exercises (many-to-many)
- User → Sessions (one-to-many)
- Session → Exercises (many-to-many with metrics)

### API Endpoints Structure

#### Authentication APIs
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `POST /auth/reset-password` - Password reset

#### User Management APIs
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `POST /users/avatar` - Upload profile photo
- `GET /users/settings` - Get user settings

#### Exercise APIs
- `GET /exercises` - List exercises with filtering
- `GET /exercises/:id` - Get exercise details
- `POST /exercises` - Create custom exercise
- `GET /exercises/search` - Search exercises

#### Workout APIs
- `GET /workouts` - List user workouts
- `POST /workouts` - Create workout plan
- `PUT /workouts/:id` - Update workout
- `DELETE /workouts/:id` - Delete workout
- `POST /workouts/:id/share` - Share workout

#### Progress APIs
- `POST /sessions` - Log workout session
- `GET /sessions` - Get workout history
- `GET /progress/analytics` - Get progress data
- `POST /progress/measurements` - Log body measurements

### Mobile App Architecture

#### Screen Structure
```
App/
├── Auth/
│   ├── LoginScreen
│   ├── RegisterScreen
│   └── ForgotPasswordScreen
├── Main/
│   ├── HomeScreen (Dashboard)
│   ├── WorkoutScreen (Plan Creator)
│   ├── ExerciseScreen (Library)
│   ├── ProgressScreen (Analytics)
│   └── ProfileScreen (User Settings)
├── Workout/
│   ├── WorkoutDetailScreen
│   ├── ExerciseSelectionScreen
│   └── WorkoutSessionScreen
└── Social/
    ├── CommunityScreen
    ├── UserProfileScreen
    └── ActivityFeedScreen
```

#### State Management
- **Redux Store**: Centralized state management
- **Slices**: Auth, User, Workouts, Exercises, Progress
- **Middleware**: API integration, offline support
- **Persistence**: Local storage for offline functionality

---

## Development Task Breakdown

### Priority 1: Core Foundation (Weeks 1-6)
1. **Authentication System**: Complete JWT implementation
2. **Database Setup**: All core tables and relationships
3. **API Layer**: Core endpoints for auth and user management
4. **Navigation**: React Navigation with proper routing
5. **State Management**: Redux setup with persistence

### Priority 2: Exercise System (Weeks 7-10)
1. **Exercise Database**: Seed with comprehensive exercise library
2. **Exercise APIs**: Full CRUD operations and search
3. **Exercise Screens**: Browse, search, and detail views
4. **Custom Exercises**: User exercise creation functionality

### Priority 3: Workout Builder (Weeks 11-14)
1. **Workout APIs**: Plan creation and management
2. **Workout Builder UI**: Drag-and-drop interface
3. **Template System**: Pre-built workout templates
4. **Sharing Features**: Community workout sharing

### Priority 4: Progress Tracking (Weeks 15-18)
1. **Session Logging**: Real-time workout tracking
2. **Analytics Engine**: Progress calculation algorithms
3. **Progress Visualization**: Charts and trend analysis
4. **Goal System**: SMART goal setting and tracking

### Priority 5: Social Features (Weeks 19-22)
1. **Social APIs**: Following, feed, and sharing
2. **Community Screens**: Activity feeds and user profiles
3. **Engagement Features**: Likes, comments, and ratings
4. **Challenge System**: Fitness challenges and competitions

---

## Quality Assurance & Testing

### Testing Strategy
- **Unit Tests**: 80%+ coverage for utilities and services
- **Integration Tests**: API endpoint testing
- **Component Tests**: React Native component testing
- **E2E Tests**: Critical user flow automation
- **Performance Tests**: Load testing and optimization

### Quality Gates
- All code must pass ESLint and TypeScript checks
- Pull requests require code review and testing
- No critical security vulnerabilities
- Performance benchmarks must be met
- Cross-platform compatibility verified

---

## Deployment & Release Strategy

### Development Environment
- Local development with hot reload
- Staging environment for testing
- Continuous integration with automated testing
- Code quality checks and security scanning

### Production Deployment
- App Store optimization and submission
- Backend deployment with monitoring
- Performance tracking and analytics
- User feedback collection and iteration

---

*For detailed technical specifications and individual task assignments, refer to the task breakdown files in the repository.*
