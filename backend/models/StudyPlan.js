const mongoose = require('mongoose');

const StudyPlanSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  sessions: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'StudySession' 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const StudyPlan = mongoose.model('StudyPlan', StudyPlanSchema);
module.exports = StudyPlan;