# BuildFit Mobile App

React Native mobile application for fitness tracking and workout sharing.

## Directory Structure

```
mobile/
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── screens/           # App screens/pages
│   ├── navigation/        # Navigation configuration
│   ├── services/          # API services and external integrations
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions and utilities
│   └── assets/            # Images, fonts, and static files
├── config/                # App configuration files
├── assets/                # Root-level assets (app icons, splash screens)
├── __tests__/             # Test files
├── tests/                 # Integration and E2E tests
├── App.js                 # Main app component
├── index.js               # App entry point
├── app.json               # React Native app configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Tech Stack

- **Framework**: React Native 0.72+
- **Language**: JavaScript/TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **UI Components**: Custom component library
- **Forms**: React Hook Form
- **Charts**: React Native Chart Kit
- **Icons**: React Native Vector Icons

## Getting Started

### Prerequisites

- Node.js 16+
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Install dependencies**:
   ```bash
   cd mobile
   npm install
   ```

2. **Install iOS dependencies** (macOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Start Metro bundler**:
   ```bash
   npm start
   ```

4. **Run on device/emulator**:
   ```bash
   # Android
   npm run android
   
   # iOS (macOS only)
   npm run ios
   ```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Development Guidelines

### Component Structure
```javascript
// components/Button/Button.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Button.styles';

const Button = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant]]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
```

### Screen Structure
```javascript
// screens/HomeScreen/HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components';
import styles from './HomeScreen.styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BuildFit</Text>
      <Button 
        title="Get Started" 
        onPress={() => navigation.navigate('Workouts')} 
      />
    </View>
  );
};

export default HomeScreen;
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```javascript
import { Button, Input } from '@/components';
import { HomeScreen } from '@/screens';
import { api } from '@/services';
import { useAuth } from '@/hooks';
import { colors, spacing } from '@/utils/theme';
```

## State Management

Using Redux Toolkit for state management:

```javascript
// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

## Testing

### Unit Tests
```javascript
// __tests__/components/Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/Button/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Optimization

- Use `React.memo()` for components that don't need frequent re-renders
- Implement `FlatList` for large datasets
- Use `useMemo()` and `useCallback()` for expensive calculations
- Optimize images with appropriate sizes and formats
- Implement lazy loading for screens

## Build and Deployment

### Android
```bash
# Generate APK
cd android
./gradlew assembleRelease

# Generate AAB (for Play Store)
./gradlew bundleRelease
```

### iOS
```bash
# Archive for App Store
npm run ios --configuration=Release
# Then use Xcode to archive and upload
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**:
   ```bash
   npm start --reset-cache
   ```

2. **Android build issues**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **iOS build issues**:
   ```bash
   cd ios
   pod install --repo-update
   cd ..
   npm run ios
   ```

4. **Package conflicts**:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Contributing

1. Follow the existing code style and patterns
2. Write tests for new components and features
3. Update documentation for new features
4. Use meaningful commit messages
5. Create pull requests with clear descriptions

## License

MIT License - see root LICENSE file for details.
