var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'src/phaser.js')

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
})

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'src/main.js')
        ],
        vendor: ['phaser']
    },
    devtool: 'cheap-source-map',
    output: {
      pathinfo: true,
        path: path.resolve(__dirname, 'dev'),
        publicPath: './dev/',
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    watch: true, 
    plugins: [
        definePlugin,
        //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html',
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './dev']
            }
        })
    ],
    module: {
        rules: [
          { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
          { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
          { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' },
          {
            test: /\.json$/,
            use: 'file-loader',
          },
          {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            use: 'url-loader?prefix=font/&limit=10000&name=[name]-[hash].[ext]',
          },
          {
            test: /\.mp3$/,
            use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
          },
          {
            test: /\.(png)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  hash: 'sha512',
                  digest: 'hex',
                  name: '[name]-[hash].[ext]',
                },
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  progressive: true,
                  optipng: {
                    optimizationLevel: 7,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                },
              },
            ],
          },
          {
            test: /\.jpg$/,
            use: [
              {
                loader: 'url-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
                options: {
                  limit: 25000,
                },
              },
            ],
          },
          {
            test: /\.xml$/,
            use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
          },
        ],
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
        }
    }
}