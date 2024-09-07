const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware to authenticate users
const roleMiddleware = require('../middleware/roleMiddleware');  // Middleware to check user roles

router.use(authMiddleware);  // Protect all routes with authentication middleware

router.get('/', CourseController.getAllCourses);  // All authenticated users can get courses

// Only 'admin' and 'instructor' can create, update, and manage courses
router.post('/', roleMiddleware(['admin', 'instructor']), CourseController.createCourse);
router.put('/:id', roleMiddleware(['admin', 'instructor']), CourseController.updateCourse);

// Only 'admin' can soft delete courses
router.delete('/:id', roleMiddleware(['admin']), CourseController.softDeleteCourse);

// Only 'admin' and 'instructor' can update the instructor or deadline
router.put('/:id/instructor', roleMiddleware(['admin', 'instructor']), CourseController.updateInstructor);
router.put('/:id/deadline', roleMiddleware(['admin', 'instructor']), CourseController.updateDeadline);

module.exports = router;
