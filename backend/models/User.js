const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    minlength: 3, 
    maxlength: 20 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /.+\@.+\..+/ // email validation
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  }
});

// hash pw
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// compare pw
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
