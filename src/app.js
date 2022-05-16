const path = require("path");
const express = require("express");
const i18n = require("i18n-express");
const exphbs = require("express-handlebars");

const serverless = require("serverless-http");

const app = express();

app.set("views", "views");
// app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.use(express.static("public"));

app.use(
  i18n({
    translationsPath: "i18n",
    siteLangs: ["nl", "en"],
    textsVarName: "translation",
  })
);

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

app.use("/.netlify/functions/app", router);

// app.listen(5555);

module.exports.handler = serverless(app);
