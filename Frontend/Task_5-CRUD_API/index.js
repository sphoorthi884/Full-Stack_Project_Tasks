const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

const itemsRouter = require("./routes/items");
app.use("/api/items", itemsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Cognifyz Task 5 server running → http://localhost:${PORT}`);
});
