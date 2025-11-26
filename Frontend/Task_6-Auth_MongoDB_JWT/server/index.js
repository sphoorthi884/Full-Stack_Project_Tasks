const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Auth Routes
app.use("/auth", require("./routes/auth"));

app.listen(4000, () => console.log("Task 6 Server running → http://localhost:4000"));
