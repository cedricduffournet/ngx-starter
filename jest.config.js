
module.exports = {

    //rootDir: '.',
    setupFilesAfterEnv: [
      '<rootDir>/src/setup-jest.ts'
    ],
    globals: {
      'ts-jest': {
        tsConfig: './tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)?$',
        astTransformers: [
          require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')
        ]
      }
    },
    transformIgnorePatterns: [
      '<rootDir>/node_modules/(?!angular2-toaster)'
    ],
    transform: {
      '^.+\\.(ts|js|html|svg)$': 'ts-jest'
    },
    testMatch: [
      '<rootDir>/src/app/**/*.spec.ts'
    ],
    testEnvironment: 'jest-environment-jsdom-thirteen',
    moduleFileExtensions: [
      //'html',
      'js',
      'json',
      'ts'
    ],
    coveragePathIgnorePatterns: [
      '<rootDir>/node_modules/'
    ],
    modulePathIgnorePatterns: [
      'dist'
    ],
    preset: 'jest-preset-angular',
    snapshotSerializers: [
      'jest-preset-angular/AngularSnapshotSerializer.js',
      'jest-preset-angular/HTMLCommentSerializer.js'
    ],
    moduleNameMapper: {
      '^@app/(.*)':'<rootDir>/src/app/$1',
      '^@env/(.*)':'<rootDir>/src/environments/$1'
    }

}