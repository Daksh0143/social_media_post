const express = require("express");
const cors = require("cors");
require("./db/db");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const likeRoutes = require("./routes/like.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieparser());
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/comment", commentRoutes);
app.listen(port, () => {
  console.log("port", port);
  console.log(`Server is listening on ${port} `);
});
