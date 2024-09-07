// middleware/roleMiddleware.js
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role;  // Assume `req.user` is set after authentication middleware
  
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  
