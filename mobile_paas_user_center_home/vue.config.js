const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  devServer: {
    // host: "0.0.0.0",
    port: 8000,
    proxy: {
      '/job_doing/api': {
        // target: 'http://paas.xb-cloud.com/user_center/api',
        target: 'http://192.168.10.33:10088',
        changeOrigin: true,
        pathRewrite: {
          '^/job_doing/api': ''
        }
      },
      '/user_center/api': {
        // target: 'http://paas.xb-cloud.com/user_center/api',
        target: 'http://192.168.10.33:10088',
        // target: 'http://192.168.20.33:10088',
        changeOrigin: true,
        pathRewrite: {
          '^/user_center/api': ''
        }
      },
      '/author/api': {
        // target: 'http://paas.xb-cloud.com/author/api',
        target: 'http://192.168.10.33:8083',
        changeOrigin: true,
        pathRewrite: {
          '^/author/api': ''
        }
      },
      '^/api': {
        // target: 'http://paas.xb-cloud.com/api',
        target: 'http://192.168.10.33:8888',
        // target: process.env.NODE_ENV === 'development' ? 'http://192.168.10.33:8888' : 'http://192.168.10.30:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */

  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    /* svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    */
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },

  // disable source map in production
  productionSourceMap: false,
  // vue书写格式错误时，在config.js中找到lintOnSave:underfined ==> false即可
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}
