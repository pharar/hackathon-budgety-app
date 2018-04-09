const express = require('express');
const path = require('path');
const { User } = require('./../server/models/users');
const bodyParser = require('body-parser');
const _ = require('lodash');
const authenticate = require('./middleware/authenticate');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://mongodb/budgetapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static('public'));

app.get('/test', (req, res) => {
  res.send('It worked');
});

// Need access to login page.
// ¿UI Login page?

app.use(bodyParser.json());

// Need defined correctly router
app.post('/login', (req, res) => {
  const body = _.pick(req.body, ['userName', 'password']);

  console.log(body);
  User.findByCredentials(body.userName, body.password)
    .then(user => {
      console.log(user);
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
        console.log(token);
      });
    })
    .catch(() => {
      res.status(400).send();
    });
});

// Create new user, how or where need it?
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['userName', 'password']);
  const user = new User(body);

  user
    .save()
    .then(() => user.generateAuthToken())
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

module.exports = app;
