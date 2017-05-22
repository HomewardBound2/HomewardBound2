const User = require('./userModel');
const client = require('twilio')('AC5d6dabce4797b65a544edc775b8858bb', 'c0a502a6ef22603ce2c3d5cc18dba45f');
const userController = {};

userController.createUser = (req, res, next) => {
    User.create(req.body, (err, user) => {
        if (err) return res.send(false);
        else {
            res.status(200);
            req.body.phone = user.phone;
            req.body._id = user._id;
            next();
        }
    });
}


userController.createQuery = (req, res, next) => {
    //req needs to pass user's phone number
    User.find({ phone: req.body.phone }, (err, user) => {
        if (err) throw new Error(err);
    }).update({ $push: { queries: { key: req.body.queries } } }, (err, query) => {
        //pushes new query into our queries array
        if (err) throw new Error(err);
        else next();
    })
}

userController.verifyUser = (req, res, next) => {
  User.findOne({phone: req.body.phone, password: req.body.password}, (err, user) => {
    if (err) throw err;
    else {
        req.body.phone = user.phone;
        req.body._id = user._id;
        next();
    }
  })
};

module.exports = userController;