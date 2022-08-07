const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Education = require("../models/education");

//get all
route.get("/", async (req, res) => {
  const educationList = await Education.find();
  // const tag = await tag.find().select("name -_id"); //to exclode some field we add -name

  if (!educationList) {
    res.status(404).json({ msg: "no  educationLists found", success: "false" });
  }

  res.send(educationList);
});

//get single education
route.get("/:id", async (req, res) => {
  const education = await Education.findById(req.params.id);

  if (!education) {
    return res
      .status(404)
      .json({ msg: "no educations found", success: "false" });
  }

  res.status(200).send(education);
  // res.status(200);.send({ name: product.name, id: product._id, category: product.category });
});

//update Education
route.put("/:id", async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      {
        eduDate: req.body.eduDate,
        eduTitle: req.body.eduTitle,
        eduDesc: req.body.eduDesc,
      },
      { new: true }
    );

    if (!updatedEducation) {
      res.status(404).json({
        success: false,
        msg: "there is no any Education found to update",
      });
    }

    res.send(updatedEducation);
  } catch (error) {
    res.status(400).send(error);
  }
});

//post Education
route.post("/", async (req, res) => {
  const education = new Education({
    eduDate: req.body.eduDate,
    eduTitle: req.body.eduTitle,
    eduDesc: req.body.eduDesc,
  });

  try {
    const savedEducation = await education.save();

    if (!savedEducation) {
      return res.status(404).send("There is no Education..!");
    }
    res.send(savedEducation);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete education

route.delete("/:id", async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndRemove(req.params.id);
    if (deletedEducation) {
      res.status(200).json({
        success: true,
        msg: `this Education with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this Education with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
