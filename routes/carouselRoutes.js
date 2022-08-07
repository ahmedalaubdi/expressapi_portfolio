const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Carousel = require("../models/carousel");

//get all
route.get("/", async (req, res) => {
  const carouselList = await Carousel.find();
  // const carousel = await carousel.find().select("name -_id"); //to exclode some field we add -name

  if (!carouselList) {
    return res
      .status(404)
      .json({ msg: "no carouselLists found", success: "false" });
  }

  res.status(200).send(carouselList);
});

//get single carousel
route.get("/:id", async (req, res) => {
  const carousel = await Carousel.findById(req.params.id);

  if (!carousel) {
    return res
      .status(404)
      .json({ msg: "no carousels found", success: "false" });
  }

  res.status(200).send(carousel);
  // res.status(200);.send({ name: product.name, id: product._id, category: product.category });
});

//update carousel
route.put("/:id", async (req, res) => {
  try {
    const updatedCarousel = await Carousel.findByIdAndUpdate(
      req.params.id,
      { image: req.body.image },
      { new: true }
    );

    if (!updatedCarousel) {
      res.status(404).json({
        success: false,
        msg: "there is no any Carousel found to update",
      });
    }

    res.send(updatedCarousel);
  } catch (error) {
    res.status(400).send(error);
  }
});

//post carousel
route.post("/", async (req, res) => {
  const carousel = new Carousel({
    image: req.body.image,
  });

  try {
    const savedCarousel = await carousel.save();

    if (!savedCarousel) {
      return res.status(404).send("There is no Carousel..!");
    }
    res.send(savedCarousel);
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//delete carousel

route.delete("/:id", async (req, res) => {
  try {
    const deletedCarousel = await Carousel.findByIdAndRemove(req.params.id);
    if (deletedCarousel) {
      res.status(200).json({
        success: true,
        msg: `this Carousel with given id: ${req.params.id} deleted successfully..!`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: `this Carousel with given id: ${req.params.id} wasnot found..! `,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = route;
