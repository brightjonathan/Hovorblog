import express from 'express';
import { verifyToken } from '../middleware/verify.user.js';
import { createpost, getPosts, deletePost, updatePost} from '../controller/post.controller.js';

const postrouter = express.Router();

postrouter.post('/create', verifyToken, createpost); 
postrouter.get('/getposts', getPosts);
postrouter.delete('/deletepost/:id', verifyToken, deletePost);
postrouter.patch('/updatepost/:id', verifyToken, updatePost);



export default postrouter;




