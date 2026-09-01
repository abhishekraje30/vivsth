const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// NOTE: Expo SDK 52+ configures Metro for npm-workspace monorepos automatically —
// no watchFolders / nodeModulesPaths needed here. Don't add them back.
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './src/global.css' });
