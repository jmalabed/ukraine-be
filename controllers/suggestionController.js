const express = require("express");
const router = express.Router();
const Suggestion = require("../models/Suggestion");

router.get("/", async (req, res) => {
  try {
    const suggestions = await Suggestion.find({});
    res.status(200).json(suggestions);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundSuggestion = await Suggestion.findById(id);
    res.status(200).json(foundSuggestion);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedSuggestion = Suggestion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedSuggestion);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedSuggestion = await Suggestion.findByIdAndRemove(id);
    res.status(200).json(deletedSuggestion);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const newSuggestion = await Suggestion.create(req.body);
    res.status(200).json();
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
