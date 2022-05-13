const path = require("path");
const express = require("express");
const i18n = require("i18n-express");
const exphbs = require("express-handlebars");

const app = express();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"),
    siteLangs: ["nl", "en"],
    textsVarName: "translation",
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(5555);
