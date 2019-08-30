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
            {
            test: /\.css$/, 
            use: [MiniCssExtractPlugin.loader, 'css-loader']
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
