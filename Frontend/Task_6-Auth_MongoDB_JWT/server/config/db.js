const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sphoorthig:Ammulu884@cluster0.pixzsi5.mongodb.net/?appName=Cluster0");
    console.log("MongoDB Atlas Connected ✔");
  } catch (err) {
    console.error("MongoDB Connection Error ❌", err);
  }
};

module.exports = connectDB;
