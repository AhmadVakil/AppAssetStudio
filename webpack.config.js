var path = require('path')

module.exports = {
  entry: './src/client/js/configChanger.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'src/client'),
    port: 4000,
    public: 'localhost:4000'
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
    {
          test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['@babel/preset-react']
              }
        },
      {
        // set up standard-loader as a preloader
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /(node_modules)/,
        options: {
          // Emit errors instead of warnings (default = false)
          error: false,
          // enable snazzy output (default = true)
          snazzy: true
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
