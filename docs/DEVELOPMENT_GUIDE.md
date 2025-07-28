# BuildFit Development Guide

Complete technical documentation for BuildFit mobile fitness platform.

## Quick Setup

```bash
# Backend
cd backend && npm install && cp .env.example .env && npm run migrate && npm run dev

# Mobile (new terminal)
cd mobile && npm install && npm start && npm run android
```

## Technology Stack

- **Mobile**: React Native, Redux Toolkit, React Navigation
- **Backend**: Node.js, Express, PostgreSQL, JWT
- **Shared**: TypeScript, ESLint, Prettier

## Project Structure

```
BuildFit/
├── mobile/           # React Native app
├── backend/          # Express API server
├── shared/           # Shared utilities
└── docs/             # Documentation
```

## Core Features Implemented

### Authentication System
- JWT-based auth with secure login/register
- Password hashing with bcrypt
- Protected routes and middleware

### Workout System
- 80+ exercise database with filtering
- Custom workout builder with templates
- Real-time workout execution with timers
- Community workout sharing and discovery

### Backend API
- RESTful API with validation
- PostgreSQL database with migrations
- Community features (publish, like, copy workouts)

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get user profile

### Workouts
- `GET /api/v1/workouts` - Get user workouts
- `POST /api/v1/workouts` - Create workout
- `GET/PUT/DELETE /api/v1/workouts/:id` - Manage specific workout

### Community
- `GET /api/v1/workouts/community` - Browse community workouts
- `POST /api/v1/workouts/:id/publish` - Publish to community
- `POST /api/v1/workouts/:id/like` - Like workout
- `POST /api/v1/workouts/:id/copy` - Copy to personal collection

## Development

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Mobile tests  
cd mobile && npm test
```

### Database Management
```bash
cd backend
npm run migrate     # Run migrations
npm run seed        # Add sample data
npm run rollback    # Rollback last migration
```

### Code Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier rules
- Write tests for new features
- Use semantic commit messages

## Next Development Priority

**Analytics & Calendar System** (Current Sprint)
- Workout calendar with history
- Progress analytics and trends
- Streak tracking and goals
- Performance metrics dashboard

For project progress and roadmap, see [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md).
