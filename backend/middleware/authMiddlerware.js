const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from headers

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // verify the token
    req.user = await User.findById(verified.id); // Add user info to the request
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
