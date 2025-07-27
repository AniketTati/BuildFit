@echo off
REM BuildFit Development Setup Script for Windows
REM This script sets up the development environment for the BuildFit project

echo 🚀 Starting BuildFit development environment setup...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ and try again.
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Check if PostgreSQL is installed
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  PostgreSQL not found. Please install PostgreSQL 12+ for database functionality.
    echo    You can continue without it for frontend-only development.
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully

REM Copy environment file if it doesn't exist
if not exist .env (
    echo 📝 Creating backend environment file...
    copy .env.example .env >nul
    echo ✅ Created .env file from template
    echo ⚠️  Please edit backend\.env with your database credentials
) else (
    echo ✅ Backend .env file already exists
)

cd ..

REM Create frontend environment file if needed
if not exist .env (
    echo 📝 Creating frontend environment file...
    (
        echo # BuildFit Frontend Environment
        echo.
        echo # API Configuration
        echo API_BASE_URL=http://localhost:3000/api/v1
        echo.
        echo # Development
        echo ENVIRONMENT=development
    ) > .env
    echo ✅ Created frontend .env file
)

echo.
echo 🎉 Setup complete! Next steps:
echo.
echo 1. Backend setup:
echo    cd backend
echo    # Edit .env with your database credentials
echo    npm run migrate  # Run database migrations
echo    npm run dev      # Start backend server
echo.
echo 2. Frontend setup (in new terminal):
echo    npm start        # Start React Native metro bundler
echo.
echo 3. Mobile app:
echo    npm run android  # Run on Android (requires Android Studio/emulator)
echo    # iOS development requires macOS
echo.
echo 📚 Check README.md files for detailed documentation
echo 🐛 Issues? Check docs/DEVELOPMENT_GUIDE.md for troubleshooting
echo.
pause
