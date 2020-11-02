const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    entry: {
      app: './src/app.js',
      images: './src/svg-images-import.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
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
        /* sprite */
        {
          test: /assets\/img\/icons\/.*\.svg$/,
          use: [
              {
                  loader: 'svg-sprite-loader',
                  options: {
                      extract: true,
                      spriteFilename: 'svg-sprite.svg',
                      outputPath: '/'
                  }
              },
              {
                  loader: 'svgo-loader',
                  options: {
                    plugins: [
                      { removeAttrs: { attrs: '(fill|stroke)' } },
                    ]
                  }
              }
          ]
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new SpriteLoaderPlugin({
        plainSprite: true
      })
    ],
};