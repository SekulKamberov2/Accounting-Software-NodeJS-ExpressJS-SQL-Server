const jwt = require('jsonwebtoken'); 
const JWT_SECRET = process.env.JWT_SECRET || 'Sechkobechkoalabala';  //yourSecretKey

exports.verifyToken = (req, res, next) => {
    
  const publicRoutes = ['/register', '/login'];
  if (req.method === 'POST' && publicRoutes.includes(req.path)) {
    return next();
  }
 
  const authHeader = req.headers.authorization;
 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
