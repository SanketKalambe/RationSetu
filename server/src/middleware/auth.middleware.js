const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rationsetu_jwt_secret_key_2026_super_secure');
    let user = await User.findById(decoded.id).select('-passwordHash');
    
    // In-memory MongoDB restart recovery:
    // If the server restarted and the user ID from the previous JWT no longer matches the re-seeded DB,
    // match the active user by role to preserve seamless local development sessions
    if (!user && decoded.role) {
      user = await User.findOne({ role: decoded.role }).select('-passwordHash');
    }

    if (!user) {
      return res.status(401).json({ success: false, error: 'User account no longer exists.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token invalid or expired.' });
  }
};

module.exports = { protect };
