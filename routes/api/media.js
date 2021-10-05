const express = require("express");
const uuid = require("uuid");
const media = require("../../Media");

const router = express.Router();

// Returns all saved media
router.get("/", (req, res) => {
  res.json(media);
});

// Delete Media
router.get("/delete", (req, res) => {
  // console.log("delete triggered", req.query.id);
  const found = media.some((media) => media.id === req.query.id);
  if (found) {
    for (let i = 0; i < media.length; i++) {
      if (media[i].id === req.query.id) {
        media.splice(i, 1);
        break;
      }
    }
    res.redirect("/");
  } else {
    res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
  }
});

// Returns a single media file by ID
router.get("/:id", (req, res) => {
  const found = media.some((media) => media.id === parseInt(req.params.id));
  if (found) {
    res.json(media.filter((media) => media.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
  }
});

// Create new media obj
router.post("/", (req, res) => {
  const newMedia = {
    id: uuid.v4(),
    title: req.body.title,
    category: req.body.category,
  };
  // console.log(newMedia.title, newMedia.category);
  if (!newMedia.title || !newMedia.category) {
    return res.status(400).json({ msg: "Please include a title and category" });
  }
  media.push(newMedia);
  //   return res.json(media);
  return res.redirect("/");
});

// Update media obj
router.put("/:id", (req, res) => {
  const found = media.some((media) => media.id === parseInt(req.params.id));
  if (found) {
    const updMedia = req.body;
    media.forEach((media) => {
      if (media.id === parseInt(req.params.id)) {
        media.title = updMedia.title ? updMedia.title : media.title;
        media.category = updMedia.category ? updMedia.category : media.category;
        res.json({ msg: "Media updated ", media });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
  }
});

module.exports = router;
