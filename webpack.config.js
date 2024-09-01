const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/utils/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'public'),
                publicPath: '/',
            },
            {
                directory: path.join(__dirname, 'src/components'),
                publicPath: '/components',
            },
        ],
        port: 8080,
        open: true,
        historyApiFallback: true,
        hot: true,
        liveReload: true,
        watchFiles: ['src/**/*', 'public/**/*'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/components', to: 'components' }],
        }),
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
