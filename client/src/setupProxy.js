const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://10.1.10.66',
      changeOrigin: true,
      secure: false, // for self-signed cert to work
    })
  );

/*
  // for host messaging interface
  app.use(
    '/hmi',
    createProxyMiddleware({
      target: 'https://10.1.10.66:8443',
      changeOrigin: true,
      secure: false, // for self-signed cert to work
    })
  );
*/

};
