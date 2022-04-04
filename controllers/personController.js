const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const parse = require("csv-parse");
const fs = require("fs");
const csv = require("csv-parser");

// parseCSV will read all entries on the CSV from the google doc. Clean the headers before hitting route!
const parseCSV = async (uri) => {
  let results = [];
  fs.createReadStream(uri)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => console.log(""));

  return results;
};

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

router.post("/manyPeople", async (req, res) => {
  try {
    let uploadedPeople = await parseCSV("./team_data/SiteResources.csv");
    const allPeopleNames = await Person.find({}).then((people) =>
      people.map((person) => person.name)
    );
    const filteredPeople = await uploadedPeople.filter(
      (person) => allPeopleNames.includes(person.name) === false
    );
    const newPeople = await Person.insertMany(filteredPeople);

    res.status(200).json(filteredPeople);
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
