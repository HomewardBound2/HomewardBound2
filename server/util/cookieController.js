const User = require('./../user/userModel');
const sessionController = require('./../session/sessionController');

const cookieController = {};
cookieController.setSSIDCookie = setSSIDCookie;
cookieController.removeSSIDCookie = removeSSIDCookie;
/**
* setSSIDCookie - store the supplied id in a cookie
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/

function setSSIDCookie(req, res, next) {
  console.log("Setting ssid cookie to ===> ", req.body._id);
  res.cookie('ssid', req.body._id, {
    httpOnly: true
  });
  next();
}

/**
* removeSSIDCookie - remove the ssid cookie
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/

function removeSSIDCookie(req, res, next) {
  req.body.ssid = req.cookies.ssid;
  res.cookies.ssid = '';
  next();
}

module.exports = cookieController;
