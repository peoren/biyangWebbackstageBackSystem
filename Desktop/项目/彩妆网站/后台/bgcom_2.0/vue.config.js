module.exports = {
    //...
    devServer: {
      proxy: {
        '/api': {
          // target: 'http://192.168.2.234:8888',
          // target: 'http://192.168.2.214:8080',
          target: 'http://192.168.2.214:8080',
          // target: 'http://172.16.7.118:8080',
          // changeOrigin: true,
          pathRewrite: {
              '^/api' : '/'
            }
        }
      }
    }
  };