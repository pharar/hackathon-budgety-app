const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');

/* mongoose
  .connect('mongodb://mongodb/budgetapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err)); */

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static('public'));

app.get('/test', (req, res) => {
  res.send('It worked');
});

module.exports = app;
