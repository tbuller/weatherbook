const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const fileUpload = require("express-fileupload");

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();
app.use(fileUpload());

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

module.exports = app;