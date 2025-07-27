#!/bin/bash

# BuildFit Development Setup Script
# This script sets up the development environment for the BuildFit project

echo "🚀 Starting BuildFit development environment setup..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Please install PostgreSQL 12+ for database functionality."
    echo "   You can continue without it for frontend-only development."
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating backend environment file..."
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please edit backend/.env with your database credentials"
else
    echo "✅ Backend .env file already exists"
fi

cd ..

# Create frontend environment file if needed
if [ ! -f .env ]; then
    echo "📝 Creating frontend environment file..."
    cat > .env << EOL
# BuildFit Frontend Environment

# API Configuration
API_BASE_URL=http://localhost:3000/api/v1

# Development
ENVIRONMENT=development
EOL
    echo "✅ Created frontend .env file"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Backend setup:"
echo "   cd backend"
echo "   # Edit .env with your database credentials"
echo "   npm run migrate  # Run database migrations"
echo "   npm run dev      # Start backend server"
echo ""
echo "2. Frontend setup (in new terminal):"
echo "   npm start        # Start React Native metro bundler"
echo ""
echo "3. Mobile app:"
echo "   npm run android  # Run on Android (requires Android Studio/emulator)"
echo "   npm run ios      # Run on iOS (requires Xcode - macOS only)"
echo ""
echo "📚 Check README.md files for detailed documentation"
echo "🐛 Issues? Check docs/DEVELOPMENT_GUIDE.md for troubleshooting"
