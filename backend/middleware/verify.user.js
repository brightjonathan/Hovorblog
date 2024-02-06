import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import { errorHandler } from '../middleware/error.js';
import jwt from 'jsonwebtoken';

//verifying the authorized user
//verifying the authorized user
export const VerifyUserToken = asyncHandler( (req, res, next)=>{
  const token = req.cookies.access_token_to_hovorblog;

  //verifying if no token
  if (!token) return next(errorHandler(401, 'unauthorized'));

  //verifying the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
      if (err) return next(errorHandler(403, 'Forbidden'));
      req.user = user;
      next();
  });
});







































// import asyncHandler from 'express-async-handler';
// import { errorHandler } from '../middleware/error.js';
// import jwt from 'jsonwebtoken';

// export const verifyToken = asyncHandler((req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(errorHandler(401, 'Unauthorized '));
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(errorHandler(401, 'Unauthorized')); 
//     }
//     req.user = user;
//     next();
//   });
// });



