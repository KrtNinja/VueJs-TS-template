import CircularDependencyPlugin from 'circular-dependency-plugin';
import * as fibers from 'fibers';
import * as path from 'path';
import * as sass from 'sass';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';

const mainEntryPoint = './src/index.ts';

// const workerPatterns = Object.values(workerPaths).map(RegExp.escape);

export default {
    entry: {
        app: mainEntryPoint
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '.',
        filename: '[name].js'
    },
    devServer: {
        contentBase:  path.join(__dirname, './dist'),
        hot: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loaders: [
                    // does not impact on build time so much for now
                    // {
                    //    loader: 'cache-loader'
                    // },
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                                // the "scss" and "sass" values for the lang attribute to the right configs here.
                                scss: 'vue-style-loader!css-loader!sass-loader',
                                sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                loaders: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                ],
                exclude: /node_modules|\.d\.ts$/
            },
            {
                test: /\.d\.ts$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[\d&.=a-z]+)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                            sassOptions: {
                                fiber: fibers,
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            // the current working directory for displaying module paths
            cwd: process.cwd()
        })
    ]
} as webpack.Configuration;