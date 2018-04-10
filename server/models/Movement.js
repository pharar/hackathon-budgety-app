const mongoose = require('mongoose');

// Budget movements model
const MovementSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
    minlength: 1,
  },
});

const Movement = mongoose.model('Movement', MovementSchema);

module.exports = { Movement };
