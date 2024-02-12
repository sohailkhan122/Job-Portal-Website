const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true
},
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    remember: {
        type: Boolean,
        required: true
    }
})
userModel.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

const UserModels = mongoose.model('userCollection', userModel);

module.exports = UserModels;