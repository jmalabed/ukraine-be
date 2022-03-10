const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");

router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find({});
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundPost = await BlogPost.findById(id);
    res.status(200).json(foundPost);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await BlogPost.create(req.body);
    res.status(200).json(newPost);
  } catch (e) {
    res.status(400).json(e);
  } finally {
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBlogPost);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await BlogPost.findByIdAndRemove(id);
    res.status(200).json(deletedPost);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
