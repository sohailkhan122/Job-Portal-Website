const express = require('express');
const { CreateJobController, fatchAllJobs, singleJob, singledelete,updateJob,disabled} = require('../Controller/CreateJobController')


const Router = express.Router();

Router.post('/createjob', CreateJobController);
Router.get('/fatchAllJobs', fatchAllJobs);
Router.get('/singleJobs/:id', singleJob);
Router.delete('/singledelete/:id', singledelete);
Router.put('/jobEdit/:id', updateJob);
Router.put('/disabled/:id', disabled);

module.exports = Router;