const express = require('express');
const path = require('path');
const hbs = require('hbs');

// const mongoose = require('mongoose');

/* mongoose
  .connect('mongodb://mongodb/budgetapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err)); */

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// ============================
// GET
// ============================

// Main route.
app.get('/', (req, res) => {
  console.log('Renderizando el login');
  res.render('login');
});

// Route to the budget data.
app.get('/app', (req, res) => {
  console.log('Renderizando el login');
  res.render('index');
});

app.get('/test', (req, res) => {
  res.send('It worked');
});

app.use(express.static(path.join(__dirname, '../public2')));
app.use('/public', express.static('public'));

module.exports = app;
