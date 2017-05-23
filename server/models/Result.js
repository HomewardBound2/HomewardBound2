const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new mongoose.Schema({
  category: {
    type: String
  },
  date: {
    type: String
  },
  hasPic: {
    type: Boolean
  },
  location: {
    type: String
  },
  pid: {
    type: String
  },
  price: {
    type: String
  },
  title: {
    type: String
  },
  url: {
    type: String
  }
})


const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
