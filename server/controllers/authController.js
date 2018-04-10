const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  // ToDo: Verify username & password
  User.findByCredentials(username, password)
    .then(user => {
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).redirect(200, '/');
        // res.header('x-auth', token).send(user);
      });
    })
    .catch(() => {
      res.status(400).send();
    });
};

exports.logout = (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    },
  );
};

exports.loginForm = (req, res) => {
  res.render('auth/loginForm');
};
