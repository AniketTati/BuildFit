# BuildFit Backend API

Backend API server for the BuildFit fitness tracking and workout sharing application.

## Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Query Builder**: Knex.js
- **Authentication**: JWT
- **Security**: Helmet, CORS, Rate Limiting
- **Environment**: dotenv

## Quick Start

### Prerequisites

- Node.js 16 or higher
- PostgreSQL 12 or higher
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and secrets
   ```

3. **Set up database**:
   ```bash
   # Create PostgreSQL database
   createdb buildfit_dev
   
   # Run migrations
   npm run migrate
   
   # Seed database (optional)
   npm run seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication (Coming Soon)
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh JWT token
- `POST /api/v1/auth/logout` - User logout

### Users (Coming Soon)
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `POST /api/v1/users/avatar` - Upload profile picture

### Exercises (Coming Soon)
- `GET /api/v1/exercises` - Get all exercises
- `GET /api/v1/exercises/:id` - Get exercise by ID
- `POST /api/v1/exercises` - Create custom exercise
- `PUT /api/v1/exercises/:id` - Update exercise
- `DELETE /api/v1/exercises/:id` - Delete exercise

### Workout Plans (Coming Soon)
- `GET /api/v1/workouts` - Get workout plans
- `GET /api/v1/workouts/:id` - Get workout plan by ID
- `POST /api/v1/workouts` - Create workout plan
- `PUT /api/v1/workouts/:id` - Update workout plan
- `DELETE /api/v1/workouts/:id` - Delete workout plan

## Database Schema

The application uses PostgreSQL with the following main tables:

### Users
- User account information and preferences
- Profile data (height, weight, fitness level)
- Authentication details

### Exercises
- Exercise library with instructions and metadata
- Support for custom user-created exercises
- Muscle groups, equipment, and difficulty categorization

### Workout Plans
- User-created workout routines
- Exercise combinations with sets, reps, rest periods
- Public sharing and community features

### Workout Sessions (Coming Soon)
- Individual workout logging
- Progress tracking and analytics
- Performance metrics

## Environment Configuration

Key environment variables (see `.env.example`):

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=buildfit_dev
DB_USER=buildfit_user
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=24h

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19006
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: API request throttling
- **Input Validation**: Request validation with Joi
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage

## Development Guidelines

### Code Structure
```
src/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Helper functions
├── database/        # Database config, migrations, seeds
└── server.js        # Main application file
```

### Error Handling
- Centralized error handling middleware
- Consistent error response format
- Environment-specific error details

### Testing
- Unit tests for models and services
- Integration tests for API endpoints
- Test database isolation

## Contributing

1. Follow the established code style (ESLint + Prettier)
2. Write tests for new features
3. Update API documentation
4. Follow semantic commit messages

## License

MIT License - see LICENSE file for details.
