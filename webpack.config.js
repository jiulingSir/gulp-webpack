 

module.exports= {
	entry: "./src/js/main.js",
	output: {
		path: __dirname+"/dist/js",
		filename: "build.js"
	},
	module: {
     loaders: [
	     {
	     	test: /\.js$/,
	     	loader: 'babel-loader',
	     	exclude: /node_modules/
	     },
	     {
	     	test: /\.vue$/,
	     	loader: 'vue'
	     }
     ],
     vue: {
     	loaders: {
     		js: 'babel'
     	}
     }
	}
}