const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

router.get("/", async (req, res) => {
  try {
    let totalDonation = 0;
    const amount = await Donation.find({}).then((donations) =>
      donations.map((donation) => (totalDonation = donation.amount))
    );
    console.log(totalDonation);
    res.status(200).json(totalDonation);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const amount = req.body;
    console.log(amount);
    const donationMade = await Donation.create({ amount: amount });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
