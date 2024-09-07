// models/User.js
const mongoose = require('mongoose');

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
    match: /.+\@.+\..+/  // email validation
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  role: {  // Add role field for RBAC
    type: String,
    enum: ['admin', 'instructor', 'student'],  // Define possible roles
    default: 'student'  // Default role
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
