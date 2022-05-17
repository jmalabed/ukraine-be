const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

const parse = require("csv-parse");
const fs = require("fs");
const csv = require("csv-parser");

// parse CSV takes the url from the csv file and truncates to just the embedID.
const parseCSV = async (url) => {
  let results = [];
  fs.createReadStream(url)
    .pipe(csv())
    .on("data", (data) => {
      data.url = data.url.slice(32, 43);
      results.push(data);
    })
    .on("end", () => console.log(results));
  return results;
};

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

// only run through postman after updating local CSV file from google doc.
router.post("/manyVideos", async (req, res) => {
  try {
    let videoList = await parseCSV("./team_data/SiteVideos.csv");
    const videosAlreadyUp = await Video.find({});
    let newVids = null;
    if (videosAlreadyUp.length > 0) {
      const existEID = await videosAlreadyUp.map((vid) => vid.url);
      newVids = videoList.filter(
        (newVid) => existEID.includes(newVid.url) === false
      );
    } else {
      newVids = videoList;
    }
    const newUpload = await Video.insertMany(newVids);
    res.status(200).json(newUpload);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
