const express = require("express");
const route = express.Router();

const Work = require("../models/work");

//Get Works
route.get("/", async (req, res) => {
  const workList = await Work.find();

  if (!workList) {
    res.status(404).json({ success: false, msg: "there is no any work" });
  }

  res.send(workList);
});

//Get work
route.get("/:id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      res.status(404).json({ success: false, msg: "there is no any work" });
    }

    res.send(work);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update work
route.put("/:id", async (req, res) => {
  const work = req.body;
  try {
    const updatedWork = await Work.findByIdAndUpdate(req.params.id, work, {
      new: true,
    });

    if (!updatedWork) {
      res.status(404).json({
        success: false,
        msg: "there is no any Work found to update",
      });
    }

    res.send(updatedWork);
  } catch (error) {
    res.status(400).send(error);
  }
});

//post Work
route.post("/", async (req, res) => {
  const work = req.body;
  const newWork = new Work(work);

  try {
    const savedWork = await newWork.save();

    if (!savedWork) {
      return res.status(404).send("There is no Work..!");
    }
    res.send(savedWork);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete work

route.delete("/:id", async (req, res) => {
  try {
    const deletedWork = await Work.findByIdAndRemove(req.params.id);
    if (deletedWork) {
      res.status(200).json({
        success: true,
        msg: `this Work with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this Work with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
