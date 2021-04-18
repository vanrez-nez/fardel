const path = require('path');
const rootWebpackConfig = require('../../webpack.config');

/** @type import('webpack').Configuration */
module.exports = {
  ...rootWebpackConfig,
  entry: {
    main: require.resolve('./src/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist/umd'),
    libraryTarget: 'umd',
  },
  plugins: [
    ...rootWebpackConfig.plugins
  ],
};