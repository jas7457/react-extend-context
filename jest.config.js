module.exports = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			tsConfig: {
				jsx: 'react',
				allowSyntheticDefaultImports: true,
				esModuleInterop: true
			}
		}
	}
};
