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

  

 //@desc      PUT funct...
//@route     PUT api/comments/likeComment/:commentId
//@access    user(public)
export const likeComment = asyncHandler(async (req, res, next)=>{
   
  try {

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(errorHandler(404, 'Comment not found'));

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);

  } catch (error) {
    next(error);
  }
});



 //@desc      DELETE funct...
//@route     PUT /api/comments/deleteComment/:commentId
//@access    user(public)
export const deleteComment = asyncHandler(async (req, res, next)=>{

  try {

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to delete this comment')
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json('Comment has been deleted');
    
  } catch (error) {
    next(error)
  }

});



 //@desc     PUT funct...
//@route     PUT /api/comments/editComment/:commentId
//@access    user(public)
export const editComment = asyncHandler( async (req, res, next)=>{
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(errorHandler(404, 'Comment not found'));
    
    if (comment.userId !== req.user.id && !req.user.isAdmin) return next( errorHandler(403, 'You are not allowed to edit this comment'));


    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);

  } catch (error) {
    next(error)
  }
});

