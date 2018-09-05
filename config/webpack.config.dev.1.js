'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
// const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('./polyfills'),
    paths.appIndexJs,
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  
  // module: {
  //   strictExportPresence: true,
  //   rules: [
  //     {
  //       test: /\.(js|jsx)$/,
  //       enforce: 'pre',
  //       use: [
  //         // {
  //         //   options: {
  //         //     formatter: eslintFormatter,
  //         //     eslintPath: require.resolve('eslint'),
  //         //
  //         //   },
  //         //   loader: require.resolve('eslint-loader'),
  //         // },
  //       ],
  //       include: paths.appSrc,
  //     },
  //     {
  //       oneOf: [
  //         {
  //           test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  //           loader: require.resolve('url-loader'),
  //           options: {
  //             limit: 10000,
  //             name: 'static/media/[name].[hash:8].[ext]',
  //           },
  //         },
  //         {
  //           test: /\.(js|jsx)$/,
  //           include: paths.srcPaths,
  //           loader: require.resolve('babel-loader'),
  //           options: {
  //             cacheDirectory: true,
  //           },
  //         },
  //         {
  //           test: /\.scss$/,
  //           use: [
  //             require.resolve('style-loader'),
  //             require.resolve('css-loader'),
  //             require.resolve('sass-loader'),
  //           ]
  //         },
  //         {
  //           test: /\.css$/,
  //           use: [
  //             require.resolve('style-loader'),
  //             {
  //               loader: require.resolve('css-loader'),
  //               options: {
  //                 importLoaders: 1,
  //               },
  //             },
  //             {
  //               loader: require.resolve('postcss-loader'),
  //               options: {
  //                 ident: 'postcss',
  //                 plugins: () => [
  //                   require('postcss-flexbugs-fixes'),
  //                   autoprefixer({
  //                     browsers: [
  //                       '>1%',
  //                       'last 4 versions',
  //                       'Firefox ESR',
  //                       'not ie < 9', // React doesn't support IE8 anyway
  //                     ],
  //                     flexbox: 'no-2009',
  //                   }),
  //                 ],
  //               },
  //             },
  //           ],
  //         },
  //         {
  //           exclude: [
  //             /\.js$/, /\.html$/, /\.json$/,
  //             /\.sass$/,
  //             /\.scss$/,
  //           ],
  //           loader: require.resolve('file-loader'),
  //           options: {
  //             name: 'static/media/[name].[hash:8].[ext]',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  plugins: [
    // new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
};
