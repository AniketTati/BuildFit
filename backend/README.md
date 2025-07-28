# BuildFit Backend API

Express.js API server for BuildFit fitness platform.

## Quick Start

```bash
cd backend
npm install
cp .env.example .env    # Configure database
npm run migrate         # Setup database  
npm run dev            # Start server (http://localhost:3000)
```

## API Endpoints

### Authentication
```
POST /api/v1/auth/register     # User registration
POST /api/v1/auth/login        # User login  
GET  /api/v1/auth/profile      # Get user profile
```

### Workouts
```
GET    /api/v1/workouts                # Get user workouts
POST   /api/v1/workouts                # Create workout
GET    /api/v1/workouts/:id            # Get workout by ID
PUT    /api/v1/workouts/:id            # Update workout
DELETE /api/v1/workouts/:id            # Delete workout
```

### Community Features
```
GET    /api/v1/workouts/community      # Browse community workouts
POST   /api/v1/workouts/:id/publish    # Publish to community
POST   /api/v1/workouts/:id/like       # Like workout
POST   /api/v1/workouts/:id/copy       # Copy to personal collection
```

## Tech Stack

**Runtime**: Node.js 16+ with Express.js  
**Database**: PostgreSQL with Knex.js migrations  
**Security**: JWT authentication, bcrypt hashing  
**Validation**: Joi schemas for all endpoints

## Development Commands

```bash
npm run dev         # Start development server
npm run test        # Run test suite
npm run migrate     # Run database migrations
npm run seed        # Seed sample data
```

For complete documentation, see [Development Guide](../docs/DEVELOPMENT_GUIDE.md).
