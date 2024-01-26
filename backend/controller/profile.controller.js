import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import {errorHandler} from '../middleware/error.js';



//@desc      GET_USER funct...
//@route    GET /api/profile/getuser
//@access    public
export const getUser = asyncHandler(async (req, res, next)=>{

    //the req.user._id (user) is coming from the verify.user.js
  const GetUser = await User.findById(req.user._id);
  try {
      if (GetUser) {
        //hiding the password 
        const {password: pass, ...rest } = GetUser._doc;
        res.status(201).json(rest);
      }else{
        next(errorHandler(401, 'user  not found'));
      }
  } catch (error) {
    next(error)
  };
});




//@desc      UPDATE_USER funct...
//@route    PATCH /api/profile/updateprofile
//@access    public
export const updatedUser = asyncHandler(async (req, res, next)=>{
    try {
      const userExist = await User.findById(req.user._id);
  
       // Check if the user(from verify.user.js) is allowed to update their account
       if (!userExist) {
        return next(errorHandler(403, 'You can only update your own account!'));
       }
  
        // Update the user and get the updated user data
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
          $set: {
              username: req.body.username,
              bio: req.body.bio,
              phone: req.body.phone,
              photo: req.body.photo,
          }
      }, { new: true });
  
      if (!updatedUser) {
          return next(errorHandler(404, 'User not found')); // Handle the case where the user doesn't exist
      }
  
        // Separate the password from the rest
        const {...rest } = updatedUser._doc; // Use _doc to access document properties
  
        res.status(200).json(rest);
  
    } catch (error) {
      next(error);    
    }
  });