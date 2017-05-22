const craigslist = require('node-craigslist');
const userController = require('./../user/userController');
const User = require('./../user/userModel')
const craigslistController = {};
let request = require('request')


craigslistController.getViewed= (phone)=>{
    User.findOne({phone}, (err, user)=>{
        if(err) throw new Error(err);
        else {
        }
    })
} 
module.exports = craigslistController;


craigslistController.executeQuery = function (req, res, next) {
    let client = new craigslist.Client({
        city : 'losangeles'
    });
    client
    .search({
        maxAsk : req.body.max,
        minAsk : req.body.min
    }, req.body.search + " bed " + req.body.zip)
    .then((listings) => {
        // filtered listings (by price) 
        req.body.list = listings;
        next();
    })
    .catch((err) => {
        console.error(err);
  });
}