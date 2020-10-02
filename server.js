const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
mongoose.connect("mongodb://127.0.0.1:27017/hex-nut-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//converts the ejs code into html
app.set("view engine", "ejs");
//access the informatin of article form to the article route
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles });
});
app.use("/articles", articleRouter);
app.listen(5000);
