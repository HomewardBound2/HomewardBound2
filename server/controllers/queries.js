const Query = require('../models/Query');
const User = require('../models/User');
const Result = require('../models/Result')
const mongoose = require('mongoose')
const craigslist = require('node-craigslist');
const client = new craigslist.Client({
  city: 'losangeles'
});


function index(req, res, next) {

}

function showQueryResults(req, res, next) {

}

function deleteQuery(req, res, next) {

}

function updateQuery(req, res, next) {

}


function createQuery(req, res, next) {
  let options = {
    category: 'apa',
    maxAsk: req.body.maxPrice,
    minAsk: req.body.minPrice,
  };

  User.findById({
    _id: req.params.userId
  }, (err, user) => {
    Query.create(req.body, function(err, query) {
      if (err) return console.log(err)
      user.queries.push(query)
      user.save(function(err, user) {
        if (err) res.send(err)
      })
    })
  })
  Query.findOne(req.body, function(err, query) {
    client.search(options, req.body.searchString).then((listings) => {
      console.log(query)
      listings.forEach((listing) => {
        query.results.push(listing)

      })
      query.save(function(err, query) {
        if (err) return conosle.log(err)
        res.json(query)
      })
    })
  })
}

module.exports = {
  createQuery: createQuery
}
