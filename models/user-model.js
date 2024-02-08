const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { jwt } = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

  username: {
    required: true,
    type: String // order doesn't effect
  },
  email: {
    type: String,
    required: true
  },

  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }


})

// bcypt or hash password
userSchema.pre('save', async function (next) {

  const user = this;
  // console.log(user); // ye all data de dega, 

  if (!user.isModified('password')) {
    next(); // go to next step
  }

  try {

    // const saltRound = 10;
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, saltRound); //user.pw = this.pw => current pw
    user.password = hashPassword;

  } catch (error) {
    next(error);
  }
})



// compare password while login

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}



const User = new mongoose.model('User', userSchema);
module.exports = User;
// jb model create kiya thha it means ki hmne new collection ko create kar liya hai. Collection means ki uske under sara data present hai.