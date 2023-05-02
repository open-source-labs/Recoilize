const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const config = {
  entry: {
    app: './src/app/index.tsx',
    service_worker: './src/extension/service_worker.ts',
    content: './src/extension/contentScript.ts',
  },
  output: {
    path: path.resolve(__dirname, 'src/extension/build/bundles'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [new NodePolyfillPlugin()],
  // the following option prevents webpack from minifying the code
  optimization: {
    minimize: false,
  },
};

// module.exports = {
//   // Other rules...
//   plugins: [new NodePolyfillPlugin()],
// };

module.exports = config;
