const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const names = [
  'index',
  '404',
  'leadership',
  'documents',
  'admin'
];

const entries = {};
names.forEach((name) => {
  entries[name] = '/src/components/' + name + '.tsx';
});

const plugins = [];

Object.keys(entries).forEach((entry) => {
  const plugin = new HtmlWebpackPlugin({
    template: './src/html/' + entry + '.html',
    filename: entry + '.html',
    chunks: [entry],
    scriptLoading: 'module'
  });
  plugins.push(plugin);
});

module.exports = {
  mode: 'production',
  entry: entries,
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/images',
          to: ''
        },
        {
          from: './src/favicons',
          to: ''
        }
      ]
    })
  ]
};