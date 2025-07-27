module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Customize rules as needed
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
          '@shared': '../shared',
        },
      },
    },
  },
};
