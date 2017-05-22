const Session = require('./sessionModel');
const cookieController = require('./../util/cookieController');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({
    cookieId: req._id
  }, function(err, session) {
    if (session) {
      console.log("Session exists: send to the next middleware function");
      next();
    } else {
      // TODO: ensure we are redirecting to the proper page
      return res.redirect('/signup')
    }
  });
};

/**
* startSessionRegister - create a new Session model and then save the new session to the
* database. Response to send user to query preferences page.
*/
sessionController.startSession = (req, res, next) => {
  Session.create({
    cookieId: req.body._id
  }, function(err, session) {
    if (session) {
      console.log("New Session - Success")
      // TODO: where to send the user after we store the session, last step in login/register
      return res.send(true)
    } else {
      console.log("New Session - Failure")
      // TODO: redirect to the signup page
      return res.send(false);
    }
  });
};


/*
* stopSession - remove the session model early if logout is posted
*/
sessionController.stopSession = (req, res, next) => {
  Session.find({ cookieId : req.body.ssid })
    .remove(function (err, session) {
      if (err) console.log("Session Stop - Failure");
      else {
        console.log("Session Stop - Success");
        // redirect to login page
        res.redirect('/login');
      }
    });
};

module.exports = sessionController;
