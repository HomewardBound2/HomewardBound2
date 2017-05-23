const User = require('../models/User');

function create(req, res, next) {
  if (!req.body.phoneNumber) {
    return res.status(422).send('Missing required fields');
  }
  User.create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          id: user._id
        }
      });
    }).catch(function(err) {
    if (err.message.match(/E11000/)) {
      err.status = 409;
    } else {
      err.status = 422;
    }
    next(err);
  });
}

function me(req, res, next) {
  User.findOne({
    _id: req.params._id
  })
    .populate('queries')
    .exec((err, user) => {
      res.json(user)
    })
    .catch(function(err) {
      next(err);
    });
}

//compare hashed passwords
function verifyUser(req, res, next) {
  User.findOne({
    phoneNumber: req.body.phoneNumber
  }, function(err, user) {
    if (err || !user) {
      console.log(user)
      res.json({
        success: false
      })
    } else {
      if (user.verifyPasswordSync(req.body.password)) {
        req._id = user._id
        next()
      } else {
        res.json({
          success: false
        })
      }
    }
  })
}


module.exports = {
  create: create,
  me: me,
  verifyUser: verifyUser
};
