const Query = require('../models/Query');
const User = require('../models/User');
const Result = require('../models/Result')
const mongoose = require('mongoose')
const craigslist = require('node-craigslist');
const client = new craigslist.Client({
  city: 'losangeles'
});


function index(req, res, next) {
  let newArr = [];
  User.findById({
    _id: req.params.userId
  }, function(err, user) {
    if (err) return console.log(err)
  }).populate('queries')
    .exec((err, user) => {
      for (let i = 0; i < user.queries.length; i++) {
        let newObj = {};
        newObj.maxPrice = user.queries[i].maxPrice
        newObj.minPrice = user.queries[i].minPrice
        newObj.searchString = user.queries[i].searchString
        newArr.push(newObj)
      }
      res.json(newArr)
    })
    .catch(function(err) {
      next(err);
    });
}


function showQueryResults(req, res, next) {
  Query.findOne({
    _id: req.params.queryId
  }, function(err, query) {
    if (err) return console.log(err)
    res.json(query.results)
  })
}

function deleteQuery(req, res, next) {

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
  createQuery: createQuery,
  index: index,
  showQueryResults: showQueryResults
}
