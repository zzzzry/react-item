const proxy = require("http-proxy-middleware");
module.exports = function(app) {
	app.use(
		"/api",
		proxy.createProxyMiddleware({
			target: "https://www.zhihu.com",
			changeOrigin: true,
			pathRewrite: {
				"^/api": ""
			}
		})
	);
};
