const mongoose = require("mongoose");

const skillsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    persentage: { type: String, required: true },

    category: { type: String, require: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillsSchema);
// exports.Products = Products;
