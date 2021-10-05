const express = require("express");
const exphbs = require("express-handlebars");
const media = require("./data/Media");

const PORT = process.env.PORT || 5000;

const app = express();

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Render index HTML view
app.get("/", (req, res) => res.render("index", {
  title: "Watchlist Tracker",
  media,
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Media obj routes
app.use("/api/media", require("./routes/api/media"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
