/// <reference types="nativewind/types" />

// Expo's Metro pipeline resolves CSS imports (global.css, *.module.css); TypeScript
// needs to be told they exist. Without this, side-effect CSS imports are TS2882 errors.
declare module '*.css';
