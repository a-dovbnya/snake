const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'game.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "less-loader"
          ]
          
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin({
      filename: 'styles.css'
    })],
};