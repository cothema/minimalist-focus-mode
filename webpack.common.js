const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    background: './src/background.ts',
    popup: './src/popup/popup.tsx',
    settings: './src/settings/settings.tsx',
    linkedin: './src/modules/linkedin/mode.ts',
    facebook: './src/modules/facebook/mode.ts',
    youtube: './src/modules/youtube/homepage.ts',
    github: './src/modules/github/mode.ts',
    news: './src/rulesets/news/news.ts',
    adult: './src/rulesets/adult/adult.ts',
    grayscale: './src/transformations/grayscale/grayscale.ts',
    style: './src/style.scss',
    stylePopup: './src/popup/popup.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'manifest.json', to: '.'},
        {from: '**/*.html', to: '.', context: 'src'},
        {from: 'assets', to: './assets'},
        {from: '_locales', to: './_locales'},
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {esModule: false},
          },
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true},
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
};
