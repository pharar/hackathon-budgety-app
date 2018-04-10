const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

mongoose
  .connect('mongodb://mongodb/budgetapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Loading Models
require('./models/User');
require('./models/Movement');

// Loading routes
const routes = require('./routes/routes');

const app = express();

// Load bodyParser middleware
app.use(bodyParser({ extend: true }));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static('public'));

// Handlebars MiddleWare
app.engine(
  '.hbs',
  hbs({
    helpers: {
      section(name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
  }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

module.exports = app;
