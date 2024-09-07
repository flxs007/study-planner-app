// controllers/userController.js
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// Update user role (Admin only)
exports.updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;  // User ID from the URL
  const { role } = req.body;  // New role from the request body

  // Check if role is valid
  const validRoles = ['admin', 'instructor', 'student'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role specified.' });
  }

  // Update user's role
  const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });

  if (!updatedUser) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  res.json({ success: true, message: `User role updated to ${role} successfully.`, user: updatedUser });
});
exports.promoteToAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;  // User ID from the URL
  
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: 'admin' },  // Set role to 'admin'
      { new: true, runValidators: true }
    );
  
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
  
    res.json({ success: true, message: `User promoted to admin successfully.`, user: updatedUser });
  });
