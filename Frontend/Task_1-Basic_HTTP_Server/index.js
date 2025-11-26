const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const submissions = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('form', { errors: {}, values: {} });
});

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!message || message.trim().length < 5) {
    errors.message = 'Message must be at least 5 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).render('form', { errors, values: { name, email, message } });
  }

  const record = { id: submissions.length + 1, name: name.trim(), email: email.trim(), message: message.trim(), createdAt: new Date() };
  submissions.push(record);

  res.render('result', { record, submissions });
});

app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`Cognifyz Task 1 server running at http://localhost:${PORT}`);
});
