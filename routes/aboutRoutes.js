const express = require("express");
const route = express.Router();

const About = require("../models/about");

//Get About
route.get("/", async (req, res) => {
  const aboutList = await About.find();

  if (!aboutList) {
    res.status(404).json({ success: false, msg: "there is no any About" });
  }

  res.send(aboutList);
});

//Get About
route.get("/:id", async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      res.status(404).json({ success: false, msg: "there is no any About" });
    }

    res.send(about);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update About
route.put("/:id", async (req, res) => {
  const about = req.body;
  try {
    const updatedAbout = await About.findByIdAndUpdate(req.params.id, about, {
      new: true,
    });

    if (!updatedAbout) {
      res.status(404).json({
        success: false,
        msg: "there is no any About found to update",
      });
    }

    res.send(updatedAbout);
  } catch (error) {
    res.status(400).send(error);
  }
});

//post About
route.post("/", async (req, res) => {
  const about = req.body;
  const newAbout = new About(about);

  try {
    const savedAbout = await newAbout.save();

    if (!savedAbout) {
      return res.status(404).send("There is no About..!");
    }
    res.send(savedAbout);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete About

route.delete("/:id", async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndRemove(req.params.id);
    if (deletedAbout) {
      res.status(200).json({
        success: true,
        msg: `this About with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this About with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
