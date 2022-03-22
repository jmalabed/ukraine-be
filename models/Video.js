const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
