module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '~': './src',
            '~assets': './src/assets',
            '~constants': './src/constants',
            '~redux': './src/redux',
            '~screens': './src/screens',
            '~styles': './src/styles',
            '~translations': './src/translations',
            '~types': './src/types',
            '~UI': './src/UI',
            '~utils': './src/utils',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};


