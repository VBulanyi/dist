const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },

    module: {
        rules: [{ 
            test: /\.js$/, 
            use: { loader: "babel-loader" }, 
            exclude: /node_modules/ 
            },
            {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
            },
            // {
            // test: /\.css$/, 
            // use: [MiniCssExtractPlugin.loader, 'css-loader']
            // },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
            // {test: /\.html$/, use: 'html-loader'},
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
},
plugins: [
    new MiniCssExtractPlugin({filename: 'style.css'}),
    new HtmlWebpackPlugin({ 
        inject: false,
        hash: true,
        template: './src/template/index.html',
        filename: './src/index.html'
    })
]
};
