const express = require('express');
const { applyForm ,fatchAllApply,singleApplydelete} = require('../Controller/ApplyUserController')


const Router = express.Router();

Router.post('/applyForm', applyForm);
Router.get('/fatchAllApply', fatchAllApply);
Router.delete('/singleApplydelete/:id', singleApplydelete);


module.exports = Router;