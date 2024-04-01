import asyncHandler from 'express-async-handler';
import { errorHandler } from '../middleware/error.js';
import Comment from '../model/comment.model.js';



//@desc      POST funct...
//@route     POST api/comments/createcomment
//@access    user(public)
export const Createcomment = asyncHandler(async (req, res, next)=>{

    try {
        const { content, postId, userId } = req.body;

        if (userId !== req.user.id) next(errorHandler(403, 'You are not allowed to create this comment'));

        const newComment = new Comment({
            content,
            postId,
            userId,
          });
          await newComment.save();
      
          res.status(200).json(newComment);
        
    } catch (error) {
        next(error);
    }
});



 //@desc      GET funct...
//@route     GET api/comments/getPostComments/:postId
//@access    user(public)
export const getPostComments = asyncHandler(async (req, res, next)=>{

    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
          createdAt: -1,
        });
        res.status(200).json(comments);
      } catch (error) {
        next(error);
      }
});

  


