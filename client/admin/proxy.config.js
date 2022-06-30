const target = process.env.PROXY_TARGET;

module.exports = {
  '/login': { target, changeOrigin: true },
  '/users/test': { target },
};
