const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3001;

let submissions = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("form", { errors: {}, values: {} });
});

app.post("/submit", (req, res) => {
  const { name, email, age, message } = req.body;
  let errors = {};

  if (!name || name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!email || !email.includes("@")) errors.email = "Enter a valid email.";
  if (!age || age < 1 || age > 120) errors.age = "Age must be between 1-120.";
  if (!message || message.length < 10) errors.message = "Message must be at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return res.render("form", { errors, values: req.body });
  }

  const record = {
    id: submissions.length + 1,
    name,
    email,
    age,
    message,
    createdAt: new Date()
  };

  submissions.push(record);

  res.render("success", { record, submissions });
});

app.listen(PORT, () => {
  console.log(`Task 2 server running → http://localhost:${PORT}`);
});
