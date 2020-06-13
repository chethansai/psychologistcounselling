const mongoose = require('mongoose');

const Sessionschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  roomid: {
    type: String,
    default: 'null'
  },

  Payments: {},
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Session = mongoose.model('session', Sessionschema);
