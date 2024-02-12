const mongoose = require('mongoose')

const createJobModel = mongoose.Schema({
    jobtittle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    workplacetype: {
        type: String,
        required: true
    },
    joblocation: {
        type: String,
        required: true
    },
    jobtype: {
        type: String,
        required: true
    },
    aboutInfo:{
        type:String,
        required:true
    },
    createdBy: {
        type:String,
        required:true
    },
    disabled:{
        type:Boolean,
        required:true
    }
})

const CreateJobModel = mongoose.model('createJobCollection', createJobModel);

module.exports = CreateJobModel;