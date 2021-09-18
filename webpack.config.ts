import path from "path";
import HtmlWebPackPlugin from "html-webpack-plugin";
import NodeExternals from "webpack-node-externals";
import TSLintPlugin from "tslint-webpack-plugin";

module.exports = [
    {
        name: "server",
        entry: "./server/index.tsx",
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        output: {
            path: path.join(__dirname, "dist/server"),
            filename: "bundle.js",
        },
        target: "node",
        node: {
            __dirname: false,
            __filename: false,
        },
        externals: [NodeExternals()],
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                    },
                },
            ],
        },
        plugins: [
            new TSLintPlugin({
                files: ["**.ts"],
            }),
        ],
    },
    {
        name: "client",
        entry: "./src/index.tsx",
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        output: {
            path: path.join(__dirname, "dist/client"),
            filename: "bundle.js",
        },
        target: "web",
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html",
                excludeChunks: ["server"],
            }),
            new TSLintPlugin({
                files: ["./src/**/*.ts"],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                    },
                },
                {
                    test: /\.html$/,
                    use: [{ loader: "html-loader" }],
                },
            ],
        },
    },
];
