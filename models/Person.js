const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  about: { type: String, required: true },
  image: { type: String, required: true },
  titles: String,
});

Person = mongoose.model("Person", personSchema);
module.exports = Person;
