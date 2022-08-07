const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Skill = require("../models/skill");

//get all
route.get("/", async (req, res) => {
  const skillList = await Skill.find();
  // const skill = await skill.find().select("name -_id"); //to exclode some field we add -name

  if (!skillList) {
    return res
      .status(404)
      .json({ msg: "no skillLists found", success: "false" });
  }

  res.status(200).send(skillList);
});

//get single product
route.get("/:id", async (req, res) => {
  const skill = await Skill.findById(req.params.id).populate("category");

  if (!skill) {
    return res.status(404).json({ msg: "no skills found", success: "false" });
  }

  res.status(200).send(skill);
  // res.status(200);.send({ name: product.name, id: product._id, category: product.category });
});

//update Skill
route.put("/:id", async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        persentage: req.body.persentage,
      },
      { new: true }
    );

    if (!updatedSkill) {
      res.status(404).json({
        success: false,
        msg: "there is no any Skill found to update",
      });
    }

    res.send(updatedSkill);
  } catch (error) {
    res.status(400).send(error);
  }
});

//post Skill
route.post("/", async (req, res) => {
  const skill = new Skill({
    name: req.body.name,
    persentage: req.body.persentage,
    category: req.body.category,
  });

  try {
    const savedSkill = await skill.save();

    if (!savedSkill) {
      return res.status(404).send("There is no Skill..!");
    }
    res.send(savedSkill);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete About

route.delete("/:id", async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndRemove(req.params.id);
    if (deletedSkill) {
      res.status(200).json({
        success: true,
        msg: `this Skill with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this Skill with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
