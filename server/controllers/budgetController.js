const mongoose = require('mongoose');

const Movement = mongoose.model('Movement');

exports.index = (req, res) => {
  res.render('index');
};

// Post movements
exports.add = (req, res) => {
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

// delete movements
exports.delete = (req, res) => {
  Movement.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({ status: 'removed' });
    })
    .catch(() => res.status(404).send('Not found'));
};

// find movements by type
exports.findByType = (req, res) => {
  Movement.find({ type: req.params.type })
    .then(docs => {
      if (!docs.length) {
        res.status(404).send('Not found');
        return;
      }
      res.send(docs);
    })
    .catch(() => res.status(404).send('Not found'));
};
