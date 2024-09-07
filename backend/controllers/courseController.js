const Course = require('../models/Course');
const asyncHandler = require('../utils/asyncHandler');

// Get all courses excluding soft-deleted ones
exports.getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ deleted: false });  // Exclude deleted courses
  res.status(200).json({ success: true, courses });
});

// Create a new course
exports.createCourse = asyncHandler(async (req, res) => {
  const { title, description, instructor, deadline } = req.body;

  if (!title || !description || !instructor) {
    return res.status(400).json({
      success: false, 
      message: 'Please provide all required fields: title, description, and instructor.'
    });
  }

  const newCourse = new Course({ title, description, instructor, deadline });
  const savedCourse = await newCourse.save();
  res.status(201).json({ success: true, course: savedCourse });
});

// Update a course
exports.updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
  if (!updatedCourse) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  res.json({ success: true, course: updatedCourse });
});

// Soft delete a course
exports.softDeleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;  // Course ID from the URL

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { deleted: true },  // Mark the course as deleted
    { new: true }
  );

  if (!updatedCourse) {
    return res.status(404).json({ success: false, message: 'Course not found.' });
  }

  res.json({ success: true, message: 'Course soft deleted successfully.' });
});

// Update only the instructor of a course
exports.updateInstructor = asyncHandler(async (req, res) => {
  const { id } = req.params;  // Course ID from the URL
  const { instructor } = req.body;  // New instructor from the request body

  if (!instructor) {
    return res.status(400).json({ success: false, message: 'Instructor is required.' });
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, { instructor }, { new: true, runValidators: true });

  if (!updatedCourse) {
    return res.status(404).json({ success: false, message: 'Course not found.' });
  }

  res.json({ success: true, course: updatedCourse });
});

// Update only the deadline of a course
exports.updateDeadline = asyncHandler(async (req, res) => {
  const { id } = req.params;  // Course ID from the URL
  const { deadline } = req.body;  // New deadline from the request body

  if (!deadline) {
    return res.status(400).json({ success: false, message: 'Deadline is required.' });
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, { deadline: new Date(deadline) }, { new: true, runValidators: true });

  if (!updatedCourse) {
    return res.status(404).json({ success: false, message: 'Course not found.' });
  }

  res.json({ success: true, course: updatedCourse });
});
