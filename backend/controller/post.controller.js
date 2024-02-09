import asyncHandler from 'express-async-handler';
import Post from '../model/post.model.js';
import { errorHandler } from '../middleware/error.js';


//@desc      POST funct...
//@route    PUT api/post/create
//@access    Admin for now 
export const createpost = asyncHandler(async (req, res, next)=>{

    const {title, content } = req.body;

    if (!req.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
      }
      if (!title || !content) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }
      const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
      const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
      });
      try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
      } catch (error) {
        next(error);
      }
});






