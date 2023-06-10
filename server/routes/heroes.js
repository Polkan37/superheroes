const express = require("express");
const multer = require("multer");
const upload = multer();

const { MAX_IMAGES } = require("../constants");

const {
  findHeroes,
  createHero,
  updateHero,
  deleteHero,
} = require("../controllers/heroes");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { limit, skip } = req.query || {};

  try {
    const heroes = await findHeroes({ limit, skip });
    res.json(heroes);
  } catch (error) {
    return next(error);
  }
});

router.post("/", upload.array("images", MAX_IMAGES), async (req, res, next) => {
    if (!req.body.nickname) {
    return res.status(404).send("Nickname is required");
  }

  try {
    const savedHero = await createHero(req.files, req.body || {});
    res.status(201).json(savedHero);
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", upload.single("image"), async (req, res, next) => {
  const { id } = req.params;

  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    current_link,
  } = req.body || {};
  const file = req.file;

  const checkFieldsOnExistence =
    nickname ||
    real_name ||
    origin_description ||
    superpowers ||
    catch_phrase ||
    current_link ||
    file;

  if (!checkFieldsOnExistence) {
    return res.status(404).send("At least on field should be updated");
  }

  try {
    const updatedHero = await updateHero(id, file, req.body);
    res.json(updatedHero);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedHero = await deleteHero(id);
    res.send(`Hero with id ${deletedHero._id} deleted`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
