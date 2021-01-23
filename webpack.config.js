const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { merge } = require('webpack-merge')

const baseConfigs = () => ({
  entry: './src/app.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    host: '0.0.0.0',
    compress: true,
    hot: true,
    port: 3000,
    publicPath: '/',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
})

const loadEnvConfigs = (env) => {
  return {
    plugins: [
      new Dotenv({
        path: path.join(__dirname, `.env.${env}`),
        safe: true,
        allowEmptyValues: true,
        systemvars: true,
        silent: true,
        defaults: true,
      }),
    ],
  }
}

module.exports = (env, argv) => {
  const ENV = env && env.ENV ? env.ENV : 'local'
  console.log(`Environment: ${env} Mode: ${argv.mode}`)
  return merge(baseConfigs(), loadEnvConfigs(ENV))
}
