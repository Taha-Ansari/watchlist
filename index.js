const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const media = require("./Media");

const PORT = process.env.PORT || 5000;

const app = express();

// Init log Middleware
// app.use(logger);

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => res.render("index", {
  title: "Media Tracker",
  media,
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serves a static index folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Media obj routes
app.use("/api/media", require("./routes/api/media"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
