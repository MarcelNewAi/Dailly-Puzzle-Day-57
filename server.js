const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost";
const port = Number(process.env.PORT || 3000);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      handle(req, res);
    })
    .listen(port, () => {
      console.log(`> Custom server ready on http://${hostname}:${port}`);
    });
});
