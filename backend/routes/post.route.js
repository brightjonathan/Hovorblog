import express from 'express';
import { verifyToken } from '../middleware/verify.user.js';
import { createpost, getPosts } from '../controller/post.controller.js';

const postrouter = express.Router();

postrouter.post('/create', verifyToken, createpost);
postrouter.get('/getposts', getPosts);

export default postrouter;




