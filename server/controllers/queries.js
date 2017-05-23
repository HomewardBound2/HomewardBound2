const Query = require('../models/Query');
const User = require('../models/User');
const mongoose = require('mongoose')
const craigslist = require('node-craigslist');

function createQuery(req, res, next) {
  var client = new craigslist.Client({
    city: 'hartford'
  });

  client
    .search('xbox one')
    .then((listings) => {
      // play with listings here...
      listings.forEach((listing) => console.log(listing));
    })
    .catch((err) => {
      console.error(err);
    });
//
//   let client = new craigslist.Client({
//     city: 'seattle'
//   });
//   let options = {
//     category: 'cta',
//     maxAsk: req.body.maxPrice,
//     minAsk: req.body.minPrice,
//   };
//
//   User.findById({
//     _id: req.params.userId
//   }, (err, user) => {
//     console.log('user', user);
//   })
// }
//
// client.search(options, 'Ford', (err, result) => {
//   // filtered listings (by price)
//   console.log('inside THEN');
//   if (err) console.log('ERROR')
//   result.forEach((listing) => console.log('listing:', listing));
}

module.exports = {
  createQuery: createQuery
}
