const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.get("/", async (req, res) => {
  try {
    const allPeople = await Person.find();
    res.status(200).json(allPeople);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundPerson = await Person.findById(req.params.id);
    res.status(200).json(foundPerson);
  } catch (e) {
    res.status(400).json(e);
  } finally {
  }
});

router.post("/", async (req, res) => {
  try {
    const newPerson = await Person.create(req.body);
    res.status(200).json(newPerson);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(editedPerson);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedPerson);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
