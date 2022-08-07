const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Route
app.use("/admin/about", require("./routes/aboutRoutes"));
app.use("/admin/tags", require("./routes/tagRoutes"));
app.use("/admin/educations", require("./routes/educationRoutes"));
app.use("/admin/experinces", require("./routes/experinceRoutes"));
app.use("/admin/skills", require("./routes/skillRoutes"));
app.use("/admin/services", require("./routes/serviceRoutes"));
app.use("/admin/works", require("./routes/workRoutes"));
app.use("/admin/carousels", require("./routes/carouselRoutes"));

// //DB Connection

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Successed ");
  } catch (error) {
    console.log("something went wrong" + error);
    process.exit(1);
  }
};

connectDB();

//listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is listening to PORT ${port}`);
});
