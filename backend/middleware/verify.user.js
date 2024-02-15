import jwt from 'jsonwebtoken';
import { errorHandler } from '../middleware/error.js';


export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token_to_hovorblog;
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, err.message));
    }
    req.user = user;
    next();
  });
};




