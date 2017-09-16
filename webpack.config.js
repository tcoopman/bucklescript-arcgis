// webpack.config.js
const path = require('path')

module.exports = {
  // Entry file can be a Reason or OCaml file
  entry: './src/Main.ml',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'release'),
    libraryTarget: "amd"
  },
  module: {
    rules: [
      // Set up Reason and OCaml files to use the loader
      { test: /\.(re|ml)$/, use: {
          loader: 'bs-loader',
          options: {
              module: 'es6'
          }
      } },
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    // Add .re and .ml to the list of extensions webpack recognizes
    extensions: ['.re', '.ml', '.js']
  },
  externals: [
      function(context, request, callback) {
          if (/^dojo/.test(request) ||
              /^dojox/.test(request) ||
              /^dijit/.test(request) ||
              /^esri/.test(request)
          ) {
              return callback(null, "amd " + request);
          }
          callback();
      }
  ],
}
// module.exports = {
//     entry: {
//         main: [
//             'babel-polyfill', './src/index.tsx' // entry point for your application code
//         ],
//     },
//     devtool: "source-map",
//     output: {
//         path: path.join(__dirname, 'dist'),
//         filename: './[name].bundle.js',
//         publicPath: '/dist/',
//         libraryTarget: "amd"
//     },
//     resolve: {
//         extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/, 
//                 enforce: "pre",
//                 use: [
//                     {loader: "source-map-loader"}
//                 ]
//             },
//             {
//                 test: /\.(jpe?g|png|gif|svg|woff2|woff|eot|ttf)$/i,
//                 use: [
//                     {
//                         loader: "file-loader",
//                         options: {
//                             hash: "sha512",
//                             digest: "hex",
//                             name: "[hash].[ext]"
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.tsx?$/,
//                 loaders: ['babel-loader', 'ts-loader'],
//                 exclude: /node_modules/
//             },
//             // css
//             {
//                 test: /\.css$/,
//                 use: ["style-loader", "css-loader"]
//             }
//         ]
//     },
//     externals: [
//         function(context, request, callback) {
//             if (/^dojo/.test(request) ||
//                 /^dojox/.test(request) ||
//                 /^dijit/.test(request) ||
//                 /^esri/.test(request)
//             ) {
//                return callback(null, "amd " + request);
//             }
//             callback();
//         }
//     ],
// };