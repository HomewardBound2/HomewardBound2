const express = require('express');
const router = express.Router();
const usersRouter = express.Router();
const queriesRouter = express.Router();

const usersController = require('../controllers/users');
const queriesController = require('../controllers/queries');


queriesRouter.route('/:userId')
  .get(queriesController.index)
  .post(queriesController.createQuery)


//creates new user
usersRouter.route('/register')
  .post(usersController.create)


usersRouter.route('/login')
  .post(usersController.verifyUser)



//shows queries of user
usersRouter.route('/:userId')
  .get(usersController.me)


module.exports = {
  users: usersRouter,
  queries: queriesRouter,

}
