const F = require("fnct");
const fs = require("fs");
const path = require("path");
const http = require("http");

http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(fs.readFileSync(path.join(__dirname, "index.html")));
  res.end();
}).listen(8080);