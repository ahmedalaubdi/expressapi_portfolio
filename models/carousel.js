const mongoose = require("mongoose");

const carouselSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Carousel", carouselSchema);
// exports.Products = Products;
