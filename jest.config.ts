export default {
  preset: 'ts-jest',
  testEnvironment: 'node',

  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },

  // Чтобы Jest не путался при импортах
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Где искать тесты
  testMatch: ['**/__tests__/**/*.test.ts'],

  // Можно отключить кэш при необходимости
  cache: false,
};
