require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 9000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./db/db");

//import controllers
const blogPostController = require("./controllers/blogPostController");
const suggestionController = require("./controllers/suggestionController");

const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Controllers!
app.use("/blog", blogPostController);
app.use("/suggestion", suggestionController);

app.listen(PORT, () => {
  console.log("Now listening on port ", PORT, "👌");
});
