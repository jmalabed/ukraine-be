const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema(
  {
    body: String,
  },
  { timestamps: true }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
module.exports = Suggestion;
