#!/bin/bash

# BuildFit Setup Verification Script
# This script verifies that the BuildFit application setup is working correctly

echo "🔍 BuildFit Setup Verification Starting..."
echo ""

# Check prerequisites
echo "📋 Checking Prerequisites:"
echo "  Node.js: $(node --version)"
echo "  npm: $(npm --version)"
echo "  PostgreSQL: $(psql --version | head -1)"
echo ""

# Check database connection
echo "🗄️  Checking Database:"
if sudo -u postgres psql -d buildfit_dev -c "\dt" > /dev/null 2>&1; then
    echo "  ✅ Database 'buildfit_dev' is accessible"
    echo "  📊 Tables: $(sudo -u postgres psql -d buildfit_dev -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';" | tr -d ' ')"
else
    echo "  ❌ Database connection failed"
fi
echo ""

# Check backend
echo "🔧 Checking Backend:"
cd backend
if [ -f ".env" ]; then
    echo "  ✅ Environment file exists"
else
    echo "  ❌ Environment file missing"
fi

if npm list > /dev/null 2>&1; then
    echo "  ✅ Backend dependencies installed"
else
    echo "  ❌ Backend dependencies missing"
fi

# Quick test run
echo "  🧪 Running quick test..."
if npm test > /dev/null 2>&1; then
    echo "  ✅ Backend tests passing"
else
    echo "  ❌ Backend tests failing"
fi
cd ..
echo ""

# Check mobile
echo "📱 Checking Mobile App:"
cd mobile
if npm list > /dev/null 2>&1; then
    echo "  ✅ Mobile dependencies installed"
else
    echo "  ❌ Mobile dependencies missing"
fi

if npm run type-check > /dev/null 2>&1; then
    echo "  ✅ TypeScript compilation successful"
else
    echo "  ❌ TypeScript compilation failed"
fi
cd ..
echo ""

echo "✅ BuildFit Setup Verification Complete!"
echo ""
echo "🚀 To start the application:"
echo "  1. Backend: cd backend && npm run dev"
echo "  2. Mobile:  cd mobile && npm start"
echo ""