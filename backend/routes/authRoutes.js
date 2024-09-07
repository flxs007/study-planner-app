const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');  // Import authentication middleware
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 reqs oer ip
    message: "Too many login attempts, please try again later."
  });

router.post('/signup', authMiddleware, registerUser);  // Ensure user is authenticated and has appropriate role
router.post('/login', loginLimiter, loginUser);



module.exports = router;
