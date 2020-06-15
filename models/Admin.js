const mongoose = require('mongoose');

const Adminschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  availablity: {
    type: Boolean
  },
  paymentbillsviawebhook: [{}],
  allsessions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId
      },
      roomid: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  sessions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId
      },
      roomid: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Admin = mongoose.model('admin', Adminschema);
