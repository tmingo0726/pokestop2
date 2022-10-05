require("dotenv").config();
const client = require("./db/client");
const cors = require("cors");
const path = require("path");
const http = require("http");
const chalk = import("chalk");

const favicon = require("serve-favicon");

const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use((req, res, next) => {
  console.log("<___Body Logger Start___>");
  console.log(req.body);
  console.log("<___Body Logger End___>");

  next();
});

const apiRouter = require("./api");
app.use("/api", apiRouter);

app.use((error, req, res, next) => {
  res.send({
    error: error.error,
    message: error.message,
  });
});

client.connect();
const PORT = process.env["PORT"] ?? 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server is listening on PORT:", PORT);
  // console.log(
  //   chalk.blueBright("Server is listening on PORT:"),
  //   chalk.yellow(PORT),
  //   chalk.blueBright("Pokemon are cool!")
  // );
});
