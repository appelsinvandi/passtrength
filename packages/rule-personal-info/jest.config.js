module.exports = {
  testEnvironment: 'node',
  roots: ['./src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.dev.json',
    },
  },
}
