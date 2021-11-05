const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: './styles/antd.less',
});

module.exports = withPlugins([[pluginAntdLess]], {
  webpack(config) {
    return config;
  }
});

const isProd = process.env.NODE_ENV === "production";