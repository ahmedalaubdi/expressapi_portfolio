const express = require("express");
const route = express.Router();

const Service = require("../models/service");

//Get services
route.get("/", async (req, res) => {
  const serviceList = await Service.find();

  if (!serviceList) {
    res.status(404).json({ success: false, msg: "there is no any service" });
  }

  res.send(serviceList);
});

//Get service
route.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404).json({ success: false, msg: "there is no any service" });
    }

    res.send(service);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update Service
route.put("/:id", async (req, res) => {
  const service = req.body;
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      service,
      { new: true }
    );

    if (!updatedService) {
      res.status(404).json({
        success: false,
        msg: "there is no any Service found to update",
      });
    }

    res.send(updatedService);
  } catch (error) {
    res.status(400).send(error);
  }
});

//post Service
route.post("/", async (req, res) => {
  const service = req.body;
  const newService = new Service(service);

  try {
    const savedService = await newService.save();

    if (!savedService) {
      return res.status(404).send("There is no Service..!");
    }
    res.send(savedService);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete Service

route.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndRemove(req.params.id);
    if (deletedService) {
      res.status(200).json({
        success: true,
        msg: `this Service with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this Service with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
