const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const isAuth = require('../middlewares/isAuth');
const errorMessage = require('../middlewares/errorMessage');

const usersRouter = Router();

usersRouter.get('/', usersController.getIndex);
usersRouter.post('/auth',  authController.login);
usersRouter.post('/logout', authController.logout);

usersRouter.get('/users', isAuth, usersController.getAll);
usersRouter.post('/addUser', errorMessage, usersController.create);

module.exports = usersRouter;