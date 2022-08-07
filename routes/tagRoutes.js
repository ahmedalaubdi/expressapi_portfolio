const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Tag = require("../models/tag");

//get all
route.get("/", async (req, res) => {
  const tagList = await Tag.find();
  // const tag = await tag.find().select("name -_id"); //to exclode some field we add -name

  if (!tagList) {
    return res.status(404).json({ msg: "no tagLists found", success: "false" });
  }

  res.status(200).send(tagList);
});

//get single product
route.get("/:id", async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return res.status(404).json({ msg: "no tags found", success: "false" });
  }

  res.status(200).send(tag);
  // res.status(200);.send({ name: product.name, id: product._id, category: product.category });
});

//update Tag
route.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      {
        totalNum: req.body.totalNum,
        titleTag: req.body.titleTag,
        descTag: req.body.descTag,
      },
      { new: true }
    );

    if (!updatedTag) {
      res.status(404).json({
        success: false,
        msg: "there is no any Tag found to update",
      });
    }

    res.send(updatedTag);
  } catch (error) {
    res.status(400).send(error);
  }
});

//post Tag
route.post("/", async (req, res) => {
  const tag = new Tag({
    totalNum: req.body.totalNum,
    titleTag: req.body.titleTag,
    descTag: req.body.descTag,
  });

  try {
    const savedTag = await tag.save();

    if (!savedTag) {
      return res.status(404).send("There is no Tag..!");
    }
    res.send(savedTag);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete Tag

route.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndRemove(req.params.id);
    if (deletedTag) {
      res.status(200).json({
        success: true,
        msg: `this Tag with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this Tag with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
