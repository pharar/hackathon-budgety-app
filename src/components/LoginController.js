// Need access to login page.
// ¿UI Login page?
import * as User from './../../server/models/users';
import * as express from './../../node_modules/express';

// const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();

app.use(bodyParser.json());

// Need defined correctly router
app.post('/', (req, res) => {
  const body = _.pick(req.body, ['userName', 'password']);

  User.findByCredentials(body.userName, body.password)
    .then(user =>
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      }),
    )
    .catch(() => {
      res.status(400).send();
    });
});

// Create new user, how or where need it?
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['nameUser', 'password']);
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
