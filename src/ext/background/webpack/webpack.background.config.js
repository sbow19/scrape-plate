const path = require('path');

module.exports = {
	entry: './src/ext/background/service_worker.ts',
	mode: 'production',
	output: {
		filename: 'service_worker.js',
		path: path.resolve(__dirname, '../../../../public/ext/background/'),
	},
	resolve: {
		modules: [__dirname, '../', '../../../../node_modules'],
		extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	watch: true
};
