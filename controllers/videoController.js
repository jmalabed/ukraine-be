const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

// get all videos
router.get("/", async (req, res) => {
  try {
    const allVideos = await Video.find({});
    res.status(200).json(allVideos);
  } catch (e) {
    res.status(400).json(e);
  }
});

// get one
router.get("/:id", async (req, res) => {
  try {
    const foundVideo = await Video.findById(req.params.id);
    res.status(200).json(foundVideo);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedVideo);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const newVideo = await Video.create(req.body);
    res.status(200).json(newVideo);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
