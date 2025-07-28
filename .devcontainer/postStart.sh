#!/bin/bash

# BuildFit Codespaces Post-Start Setup Script
# This script runs every time the Codespace starts

echo "🚀 BuildFit Codespaces Post-Start Setup..."

# Start PostgreSQL service
echo "📊 Starting PostgreSQL service..."
sudo service postgresql start

# Create buildfit database and user if they don't exist
echo "🗄️ Setting up database..."
sudo -u postgres psql -c "CREATE DATABASE buildfit_dev;" 2>/dev/null || echo "Database buildfit_dev already exists"
sudo -u postgres psql -c "CREATE USER buildfit_user WITH PASSWORD 'postgres';" 2>/dev/null || echo "User buildfit_user already exists"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE buildfit_dev TO buildfit_user;" 2>/dev/null

# Create backend .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend environment file for Codespaces..."
    cat > backend/.env << 'EOL'
# BuildFit Backend Environment - Codespaces Configuration

# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration (PostgreSQL service in Codespaces)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=buildfit_dev
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Configuration (development only - change in production)
JWT_SECRET=codespaces_dev_secret_change_in_production_please
JWT_REFRESH_SECRET=codespaces_refresh_secret_change_in_production_please
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration (allows Codespaces preview URLs)
ALLOWED_ORIGINS=*

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Logging
LOG_LEVEL=info
EOL
    echo "✅ Backend .env file created"
else
    echo "✅ Backend .env file already exists"
fi

# Run database migrations
echo "🗄️ Running database migrations..."
cd backend && npm run migrate 2>/dev/null || echo "⚠️ Migrations failed - database may not be ready yet"
cd ..

# Create mobile .env file if needed
if [ ! -f mobile/.env ]; then
    echo "📱 Creating mobile environment file for Codespaces..."
    cat > mobile/.env << 'EOL'
# BuildFit Mobile Environment - Codespaces Configuration

# API Configuration (will be auto-updated with Codespace URL)
API_BASE_URL=http://localhost:3000/api/v1

# Development
ENVIRONMENT=development
EOL
    echo "✅ Mobile .env file created"
fi

echo ""
echo "🎉 BuildFit Codespaces setup complete!"
echo ""
echo "📖 Quick start commands:"
echo "  Backend API:  cd backend && npm run dev"
echo "  Mobile App:   cd mobile && npm start"
echo ""
echo "🔗 Your services will be available at:"
echo "  API:    https://\$CODESPACE_NAME-3000.githubpreview.dev"
echo "  Metro:  https://\$CODESPACE_NAME-8081.githubpreview.dev"
echo ""
echo "📚 See README.md for detailed Codespaces instructions"