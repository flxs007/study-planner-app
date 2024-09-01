const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  duration: { 
    type: Number, // minutes
    required: true 
  },
  notes: { 
    type: String 
  },
});

const StudySession = mongoose.model('StudySession', StudySessionSchema);
module.exports = StudySession;