const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js",

    output: {
        filename: "bundle.[hash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),

    ],
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: require.resolve("babel-loader"),
                
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ["file-loader"],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            //minSize: 20000,
            //minRemainingSize: 0,
            //minChunks: 1,
            //maxAsyncRequests: 30,
            //maxInitialRequests: 30,
            //enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                    filename: 'vendor.bundle.js',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};