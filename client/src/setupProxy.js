const { createProxyMiddleware } = require('http-proxy-middleware');

const ENDPOINT = 'https://groundhog-day.diamondkey.com/';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: ENDPOINT,
      changeOrigin: true,
      secure: false, // for self-signed cert to work
    })
  );

  app.use(
    '/reports',
    createProxyMiddleware({
      target: ENDPOINT,
      changeOrigin: true,
      secure: false, // for self-signed cert to work
    })
  );

  app.use(
    '/phpwrapper',
    createProxyMiddleware({
      target: ENDPOINT,
      changeOrigin: true,
      secure: false, // for self-signed cert to work
    })
  );

  app.use(
    '/scadaviews/bayview',
    createProxyMiddleware({
      target: ENDPOINT,
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
