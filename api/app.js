const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const fileUpload = require("express-fileupload");

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const chatsRouter = require("./routes/chats");

const app = express();
app.use(fileUpload());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/chats", chatsRouter);

module.exports = app;