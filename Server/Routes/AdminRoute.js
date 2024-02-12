const express = require('express');
const { AdminConreoller,AdminLoginConreoller } = require('../Controller/AdminController');

const Router = express.Router();

Router.post('/AdminSigin', AdminConreoller);
Router.post('/AdminLogIn', AdminLoginConreoller);

module.exports = Router;