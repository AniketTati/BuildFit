const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 */

const config = {
  resolver: {
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
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
