const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
const withImages = require('next-images');

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: './styles/antd.less',
});

module.exports = withPlugins([[pluginAntdLess]],
  withImages({
    images: {
      domains: ['i.creativecommons.org']
    },
    webpack(config) {
      return config;
    }
  })
);

const isProd = process.env.NODE_ENV === "production";