const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Experince = require("../models/experince");

//get all experince
route.get("/", async (req, res) => {
  const experinceList = await Experince.find();
  // const tag = await tag.find().select("name -_id"); //to exclode some field we add -name

  if (!experinceList) {
    return res
      .status(404)
      .json({ msg: "no  experinceLists found", success: "false" });
  }

  res.status(200).send(experinceList);
});

//get single experince
route.get("/:id", async (req, res) => {
  const experince = await experince.findById(req.params.id);

  if (!experince) {
    return res
      .status(404)
      .json({ msg: "no experinces found", success: "false" });
  }

  res.status(200).send(experince);
  // res.status(200);.send({ name: product.name, id: product._id, category: product.category });
});

//update experince
route.put("/:id", async (req, res) => {
  try {
    const updatedExperince = await Experince.findByIdAndUpdate(
      req.params.id,
      {
        expDate: req.body.expDate,
        expTitle: req.body.expTitle,
        expDesc: req.body.expDesc,
      },
      { new: true }
    );

    if (!updatedExperince) {
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

//post Experince
route.post("/", async (req, res) => {
  const experince = new Experince({
    expDate: req.body.expDate,
    expTitle: req.body.expTitle,
    expDesc: req.body.expDesc,
  });

  try {
    const savedExperince = await experince.save();

    if (!savedExperince) {
      return res.status(404).send("There is no Experince..!");
    }
    res.send(savedExperince);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete Experince

route.delete("/:id", async (req, res) => {
  try {
    const deletedExperince = await Experince.findByIdAndRemove(req.params.id);
    if (deletedExperince) {
      res.status(200).json({
        success: true,
        msg: `this Experince with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this Experince with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
