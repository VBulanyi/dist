const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{ 
            test: /\.js$/, 
            use: { loader: "babel-loader" }, 
            exclude: /node_modules/ 
            },
            {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./src/vendor/[name].[ext]'
            },
            // {
            // test: /\.css$/, 
            // use: [MiniCssExtractPlugin.loader, 'css-loader']
            // },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                        'file-loader?name=./src/images/[name].[ext]', 
                        {
                                loader: 'image-webpack-loader',
                                options: {bypassOnDebug: true,
                                disable: true}
                        },
                ],
            }

        ]
    },
           

plugins: [
    new MiniCssExtractPlugin({filename: 'style.css'}),
    new HtmlWebpackPlugin({ 
        inject: false,
        hash: true,
        template: './src/index.html',
        filename: 'index.html'
    })
]
};


// plugins: [
//     new MiniCssExtractPlugin({filename: 'style.css'}),
//     new HtmlWebpackPlugin({ 
//         inject: false,
//         hash: true,
//         template: './src/index.html',
//         filename: 'index.html'
//     })
// ]
// };











