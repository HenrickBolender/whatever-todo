const path = require('path');
const webpack = require("webpack");
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        mode: 'development',
        resolve: {extensions: ['.js', '.jsx']},
        entry: {'main' : './ClientApp/boot.jsx'},
        output: {
            filename: '[name].js',
            path: path.join(__dirname, bundleOutputDir),
            publicPath: 'dist/'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: /ClientApp/,
                    use: 'babel-loader'
                }, {
                    test: /\.css$/,
                    loader: 'style-loader'
                }, {
                    test: /\.css$/,
                    loader: 'css-loader',
                    query: {
                        modules: true,
                        localIdentName: isDevBuild ? '[folder]__[local]-[hash:base64:5]' : '[hash:base64:5] ',
                    }
                }
            ]
        }
    }]
};