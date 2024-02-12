const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


const adminModel = mongoose.Schema({
  name: {
    type: String,
    required: true
},
    password: {
        type: String,
        required: true
    }
})
adminModel.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  adminModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

const AdminModels = mongoose.model('adminCollection', adminModel);

module.exports = AdminModels;