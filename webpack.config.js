const path = require('path');
const express = require('express');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const history = require('connect-history-api-fallback'); // добавляем connect-history-api-fallback

module.exports = {
    mode: 'development',
    entry: './src/app/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-modules-typescript-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        },
                    },
                    {loader: 'sass-loader'}
                ],
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({      
            template: "./public/index.html"
        })
    ]
};