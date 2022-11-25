module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: '@sucrase/webpack-loader',
					options: {
						transforms: ['jsx']
					}
				}
			},
			{
				test: /\.css$/,
				loaders: ["style-loader", "css-loader"]
			}
		]
	}
};
