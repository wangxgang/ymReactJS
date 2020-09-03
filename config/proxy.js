/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      // target: 'http://192.168.1.127:8092',
      // target: 'http://120.25.227.68:3002',
      target: 'http://localhost:3300',
      changeOrigin: true,
      pathRewrite: {
        '^': ''
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      // target: 'http://120.25.227.68:3002',
      target: 'http://192.168.3.8:3300',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
