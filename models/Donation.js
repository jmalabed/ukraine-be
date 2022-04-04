const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    name: String,
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
