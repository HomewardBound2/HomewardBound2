const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new mongoose.Schema({
  description: {
    type: String
  },
  mapUrl: {
    type: String
  },
  pid: {
    type: String
  },
  replyUrl: {
    type: String
  },
  title: {
    type: String
  },
  url: {
    type: String
  },
  postedAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  images: {
    type: [String]
  },
  contactName: {
    type: Number
  },
  phoneNumber: {
    type: Number
  },
  email: {
    type: String
  }
})


const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
