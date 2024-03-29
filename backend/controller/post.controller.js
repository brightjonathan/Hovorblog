import asyncHandler from 'express-async-handler';
import Post from '../model/post.model.js';
import { errorHandler } from '../middleware/error.js';


//@desc      POST funct...
//@route    PUT api/post/create
//@access    Admin for now 
export const createpost = asyncHandler(async (req, res, next)=>{

    const {title, content } = req.body;

    if (!req.user.isAdmin || !req.user) {
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



//@desc      GET funct...
//@route    GET api/post/getposts
//@access    public
export const getPosts = asyncHandler(async (req, res, next)=>{

  try {

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

      const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
    
  } catch (error) {
    next(error)
  }
   
});



//@desc      DELETE funct...
//@route    DELETE api/post/deletepost/:id
//@access    public
export const deletePost = asyncHandler(async (req, res, next)=>{

  const UserPost = await Post.findById(req.params.id);  //the require params is the postId not the userId

  // if product doesnt exist
  if (!UserPost)  return next(errorHandler(404, "Post not found"));

  if (!req.user.isAdmin || UserPost.userId !== req.user.id) return next(errorHandler(401, 'User not authorized'));

  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted."});
 } catch(error) {
   next(error);
 };


})

//@desc     UPDATE funct...
//@route    UPDATE api/post/updatepost/:id
//@access    public
export const updatePost = asyncHandler(async (req, res, next)=>{

  const UserPost = await Post.findById(req.params.id); //the require params is the postId not the userId

  // if product doesnt exist
  if (!UserPost)  return next(errorHandler(404, "Post not found"));

  if (!req.user.isAdmin || UserPost.userId !== req.user.id) return next(errorHandler(401, 'User not authorized'));


  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        category: req.body.category,
        image: req.body.image,
        content: req.body.content,
      },
    },
    { new: true }
  )

  res.status(200).json(updatePost);
  
});