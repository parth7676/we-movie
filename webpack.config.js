const { resolve, join } = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function envHelper(env, argv) {
    // Loading .env files based on environment mode.
    // Get the root path
    const currentPath = join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + "/.env";

    // We're concatenating the environment name to our filename to specify the correct env file!
    let envPath = "";
    if (argv.mode === "development")
        envPath = basePath + ".development";
    if (argv.mode === "production")
        envPath = basePath + ".production";

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // Reading env file for data
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return envKeys
}

let config = {
    resolve: {
        extensions: ["*", ".js", ".jsx", ".css", ".scss", ".ttf", ".woff2", ".eot", ".svg"],
        alias: {
            "publicPath": resolve(__dirname, "public"),
            "src": resolve("src"),
            "scss": resolve("src/scss")
        }
    },
    context: resolve(__dirname, "src"),
    entry: [
        "babel-polyfill",
        resolve("src", "index.js")
    ],
    output: {
        filename: "[name].[contenthash].js",
        path: resolve(__dirname, "build/"),
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    module: {
        rules: [{
            test: /.js?$/,
            exclude: /(node_modules)/,
            loader: ["babel-loader", "eslint-loader"],
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            })
        },
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: resolve("public", "index.html")
        }),
        new ExtractTextPlugin(join("css", "[name].css")),
    ]
}

module.exports = (env, argv) => {
    config.plugins.push(new webpack.DefinePlugin(envHelper(env, argv)));
    return config;
}