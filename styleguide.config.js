const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const vueLoader = require('vue-loader')
const path = require('path')
assetsPath = function (_path) {
	const assetsSubDirectory = process.env.NODE_ENV === 'production'
		? 'static'
		: 'static'

	return path.posix.join(assetsSubDirectory, _path)
}

const transpileDependencies = [
	'regexpu-core',
	'strip-ansi',
	'ansi-regex',
	'ansi-styles',
	'react-dev-utils',
	'chalk',
	'unicode-match-property-ecmascript',
	'unicode-match-property-value-ecmascript',
	'acorn-jsx',
	'@znck[\\\\/]prop-types'
]

module.exports = {
	title: '自定义UI组件',
	components: 'src/components/**/[A-Z]*.vue',
	defaultExample: true,
	minimize: false,
	ribbon: {
		text: '查看源码',
		url: 'https://coding.jd.com/shichangxue/UIDOC.git'
	},
	version: '1.1.0',
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.js$/,
					exclude: modulePath =>
						(/node_modules/.test(modulePath) ||
							/packages[\\/]vue-styleguidist[\\/]lib/.test(modulePath)) &&
						!transpileDependencies.some(mod =>
							new RegExp(`node_modules[\\\\/]${mod}[\\\\/]`).test(modulePath)
						),
					use: {
						loader: 'babel-loader',
						options: {
							sourceType: 'unambiguous',
							presets: [
								[
									'@babel/preset-env',
									{
										useBuiltIns: 'usage',
										corejs: 2,
										targets: {
											ie: '11'
										}
									}
								]
							],
							comments: false
						}
					}
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				//在此配置less和scss插件，需要安装相应的loader
				{
					test: /\.less$/,
					loader: "style-loader!css-loader!less-loader",
				},
				{
					test: /\.scss$/,
					loader: "style-loader!css-loader!scss-loader",
				},
				{
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					loader: 'url-loader',
					options: {
					  limit: 10000,
					  name: assetsPath('img/[name].[hash:7].[ext]')
					}
				  },
				  {
					test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
					loader: 'url-loader',
					options: {
					  limit: 10000,
					  name: assetsPath('media/[name].[hash:7].[ext]')
					}
				  },
				  {
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					loader: 'url-loader',
					options: {
					  limit: 10000,
					  name: assetsPath('fonts/[name].[hash:7].[ext]')
					}
				  }
			]
		},

		plugins: [new vueLoader.VueLoaderPlugin()].concat(
			process.argv.includes('--analyze') ? [new BundleAnalyzerPlugin()] : []
		)
	},
	usageMode: 'expand',
	exampleMode: 'expand',
	editorConfig: {
		theme: 'solarized dark'
	},
	compilerConfig: {
		target: { ie: 11 }
	},
	styleguideDir: 'dist',
	codeSplit: true // extract compiler and editor to accelerate first load
}
