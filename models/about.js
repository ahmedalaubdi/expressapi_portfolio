const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },

    desc: { type: String },

    // education: [
    //   {
    //     eduDate: { type: String },
    //     eduTitle: { type: String },
    //     eduDesc: { type: String },
    //   },
    // ],
    // experince: [
    //   {
    //     expDate: { type: String },
    //     expTitle: { type: String },
    //     expDesc: { type: String },
    //   },
    // ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
// exports.Products = Products;
