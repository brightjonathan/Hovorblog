import asyncHandler from 'express-async-handler';
import { errorHandler } from '../middleware/error.js';
import User from '../model/user.model.js';


//@desc      GET funct...
//@route    GET api/users/allusers
//@access    Admin(private)
export const getallusers = asyncHandler(async(req, res, next)=>{
    if (!req.user.isAdmin)  return next(errorHandler(403, 'You are not allowed to see all users'));

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    
        const users = await User.find()
          .sort({ createdAt: sortDirection })
          .skip(startIndex)
          .limit(limit);
    
        const usersWithoutPassword = users.map((user) => {
          const { password, ...rest } = user._doc;
          return rest;
        });
    
        const totalUsers = await User.countDocuments();
    
        const now = new Date();
    
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
    
        res.status(200).json({
          users: usersWithoutPassword,
          totalUsers,
          lastMonthUsers,
        });
      } catch (error) {
        next(error);
      }
    
});



//@desc      DELETE funct...
//@route    DELETE api/users/deleteuser/:userId
//@access    Admin(private)
export const deleteUsers = asyncHandler(async (req, res, next)=>{
  
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
});



//@desc      GET funct...
//@route     GET api/users/:userId
//@access    user(public)
export const getUser = asyncHandler(async (req, res, next)=>{
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorHandler(404, 'User not found'));
    
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }

});


