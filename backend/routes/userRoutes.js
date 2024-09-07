// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');  // Middleware for authentication
const roleMiddleware = require('../middleware/roleMiddleware');  // Middleware for role-based access control

router.use(authMiddleware);  // Protect all routes with authentication middleware

// Only 'admin' can update user roles
router.put('/:id/role', roleMiddleware(['admin']), userController.updateUserRole);
router.put('/:id/promote', roleMiddleware(['admin']), userController.promoteToAdmin);


module.exports = router;
