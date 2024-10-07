const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry :'./src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js'
    },
    target: 'node', // Webpack debe empaquetar para Node.js
    externals: [nodeExternals()], // Excluir módulos de node_modules
    resolve: {
        extensions:['.js']
    },
    module: {
        rules:[
            {
                test:/\.m?js$/,
                exclude:/node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                    },
                },
            }
        ]
    }
}
