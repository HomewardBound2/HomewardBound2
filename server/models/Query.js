const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Result = require('../models/Result')
const resultSchema = Result.schema


//TODO: Specify category, location
const querySchema = new mongoose.Schema({
  maxPrice: {
    type: Number,
    required: true
  },
  minPrice: {
    type: Number,
    required: true
  },
  searchString: {
    type: String,
    required: true
  },
  results: []
})


const Query = mongoose.model('Query', querySchema);

module.exports = Query;
