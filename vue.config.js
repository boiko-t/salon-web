module.exports = {
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
        data: `@import "~@/assets/styles/import.scss";`,
      },
    },
  },
};
