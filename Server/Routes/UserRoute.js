const express = require('express');
const { UserConreoller, UserLoginConreoller, ForgetPassword, resetPassword, resetsPassword } = require('../Controller/UserController');

const Router = express.Router();

Router.post('/userSignUp', UserConreoller);
Router.post('/userLogIn', UserLoginConreoller);
Router.post('/forgetPassword', ForgetPassword);
Router.get('/resetPassword/:id/:token', resetPassword);
Router.post('/resetPassword/:id/:token', resetsPassword);

module.exports = Router;