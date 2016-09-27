module.exports = {
  entry: './docs_src/index.jsx',
  output: {
    path: './docs',
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
