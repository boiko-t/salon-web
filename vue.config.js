const fs = require('fs');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('certs/server.key'),
      cert: fs.readFileSync('certs/server.crt'),
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/styles/import.scss";',
      },
    },
  },
};
