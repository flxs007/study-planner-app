
const StudyPlan = require('../models/StudyPlan'); 

exports.getAllStudyPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user.id });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving study plans' });
  }
};

exports.createStudyPlan = async (req, res) => {
  const newPlan = new StudyPlan({
    userId: req.user.id, 
    ...req.body 
  });
  
  try {
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: 'Error creating study plan' });
  }
};

exports.updateStudyPlan = async (req, res) => {
  try {
    const updatedPlan = await StudyPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlan);
  } catch (error) {
    res.status(404).json({ message: 'Study plan not found' });
  }
};

exports.deleteStudyPlan = async (req, res) => {
  try {
    await StudyPlan.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Study plan not found' });
  }
};