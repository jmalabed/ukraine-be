const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema(
  {
    title: String,
    body: String,
  },
  { timestamps: true }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
module.exports = Suggestion;
