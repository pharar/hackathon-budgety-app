const mongoose = require('mongoose');

const Movement = mongoose.model('Movement');

exports.index = (req, res) => {
  res.render('index');
};

// Post movements
exports.add = (req, res) => {
  console.log('Hola, mundo');
  console.log(req.body.type);
  console.log(req.body.description);
  console.log(req.body.value);
  const movement = new Movement({
    type: req.body.type,
    description: req.body.description,
    value: req.body.value,
  });

  movement.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    },
  );
};
