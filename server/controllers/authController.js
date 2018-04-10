const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.login = (req, res, next) => {
  const body = _.pick(req.body, ['userName', 'password']);
  User.findByCredentials(body.userName, body.password)
    .then(user => {
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(() => {
      res.status(400).send();
    });
};

exports.logout = () => {};

exports.loginForm = (req, res) => {
  res.render('auth/loginForm');
};
