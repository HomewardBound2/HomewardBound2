const express = require('express');
const router = express.Router();
const usersRouter = express.Router();
const queriesRouter = express.Router();

const usersController = require('../controllers/users');
const queriesController = require('../controllers/queries');


queriesRouter.route('/:userId')
  .get(queriesController.index)
  .post(queriesController.createQuery)


queriesRouter.route('/:userId/:queryId')
  .get(queriesController.showQueryResults)
  .delete(queriesController.deleteQuery)


//creates new user
usersRouter.route('/register')
  .post(usersController.create)

module.exports = {
  users: usersRouter,
  queries: queriesRouter
}
