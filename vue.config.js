module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/db_static/' : '/',
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production'){
      config.plugin('html').tap((opts) => {
        opts[0].filename = './index.jinja2';
        return opts
      });
    }
  },
};
