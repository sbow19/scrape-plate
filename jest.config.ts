export {};
module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	transform: {
		'.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: './tsconfig.test.json',
			},
		],
    
	},

	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/coverage',
		'package.json',
		'package-lock.json',
		'reportWebVitals.ts',
		'setupTests.ts',
		'index.tsx',
		'/public/',
	],
	rootDir: ".",
	moduleNameMapper: {
	'#styles/(.*)\\.module\\.css$': "<rootDir>/src/__mocks__/styleMock.js",
	 '^.+\\.module\\.(css|less)$':  "<rootDir>/src/__mocks__/styleMock.js",
    '#components/(.*)': '<rootDir>/src/app/components/$1',
    '#containers/(.*)': '<rootDir>/src/app/containers/$1',
    '#ducks/(.*)': '<rootDir>/src/app/ducks/$1',
    '#models/(.*)': '<rootDir>/src/app/models/$1',
    '#assets/(.*)': '<rootDir>/src/assets/$1',
    '@mock/(.*)': '<rootDir>/src/__mocks__/$1',
    
	},
	setupFilesAfterEnv: ['./jest.setup.ts'],
	verbose: true
};
