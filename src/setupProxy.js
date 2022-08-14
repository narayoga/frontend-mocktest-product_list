const proxy = require("http-proxy-middleware")

module.exports = function(app, id) {
    app.use(
        proxy(`${id}`, {
            target: "https://test-binar.herokuapp.com/v1/products",
            secure: false,
            changeOrigin: true
        })
    );
}