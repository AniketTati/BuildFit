module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
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
    ],
  ],
};
