const StudyPlan = require('../models/StudyPlan');
const asyncHandler = require('../utils/asyncHandler');

// Get all study plans
exports.getAllStudyPlans = asyncHandler(async (req, res) => {
  const plans = await StudyPlan.find({ userId: req.user.id });
  res.json(plans);
});

// Create a study plan
exports.createStudyPlan = asyncHandler(async (req, res) => {
  const newPlan = new StudyPlan({
    userId: req.user.id, 
    ...req.body 
  });
  
  const savedPlan = await newPlan.save();
  res.status(201).json(savedPlan);
});

// Update a study plan
exports.updateStudyPlan = asyncHandler(async (req, res) => {
  const updatedPlan = await StudyPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPlan);
});

// Delete a study plan
exports.deleteStudyPlan = asyncHandler(async (req, res) => {
  await StudyPlan.findByIdAndRemove(req.params.id);
  res.status(204).send();
});
