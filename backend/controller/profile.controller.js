import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import {errorHandler} from '../middleware/error.js';


//@desc      UPDATE_USER funct...
//@route    PATCH /api/profile/updateprofile
//@access    public
export const updatedUser = asyncHandler(async (req, res, next)=>{

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (req.body.username) {
    
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          photo: req.body.photo,
          phone: req.body.phone,
          bio: req.body.bio
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }

  });