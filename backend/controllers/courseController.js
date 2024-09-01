const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json({ success: true, courses });
    } catch (err) {
        console.error('Error fetching courses:', err);
        return res.status(500).json({ success: false, message: 'Error fetching courses' });
    }
};

// Create a new course
exports.createCourse = async (req, res) => {
    const { title, description, instructor } = req.body;

    // Validate request body
    if (!title || !description || !instructor) {
        return res.status(400).json({
            success: false, 
            message: 'Please provide all required fields: title, description, and instructor.'
        });
    }

    const newCourse = new Course({ title, description, instructor });

    try {
        const savedCourse = await newCourse.save();
        return res.status(201).json({ success: true, course: savedCourse });
    } catch (err) {
        console.error('Error creating course:', err);
        return res.status(500).json({
            success: false, 
            message: 'Error creating course', 
            error: err.message 
        });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;


    const fieldsToUpdate = ['title', 'description', 'instructor'];
    const hasUpdates = fieldsToUpdate.some(field => updatedData[field] !== undefined);

    if (!hasUpdates) {
        return res.status(400).json({
            success: false, 
            message: 'Please provide at least one field to update: title, description, or instructor.'
        });
    }

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        return res.json({ success: true, course: updatedCourse });
    } catch (err) {
        console.error('Error updating course:', err);
        return res.status(400).json({
            success: false, 
            message: 'Error updating course', 
            error: err.message 
        });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        return res.json({ success: true, message: 'Course deleted successfully' });
    } catch (err) {
        console.error('Error deleting course:', err);
        return res.status(400).json({
            success: false, 
            message: 'Error deleting course', 
            error: err.message 
        });
    }
};
