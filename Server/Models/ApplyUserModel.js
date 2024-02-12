const mongoose = require('mongoose')

const applyUser = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    userId:{
        type:String,
        required:true
    }
})

const ApplyUserModel = mongoose.model('applyUserCollection', applyUser);

module.exports = ApplyUserModel;