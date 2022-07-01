const target = process.env.PROXY_TARGET;

module.exports = {
  '/api': {
    target,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
