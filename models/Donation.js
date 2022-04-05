const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
  {
    amount: { type: Number, required: true },
    name: String,
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
