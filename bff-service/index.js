// simple express server
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World from BFF Service!");
});

app.listen(port, () => {
  console.log(`BFF service started`);
});
