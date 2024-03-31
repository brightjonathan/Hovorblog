import express from 'express';
import { verifyToken } from '../middleware/verify.user.js';
import { Createcomment } from '../controller/comment.controller.js';


const commentrouter = express.Router();


commentrouter.post('/createcomment', verifyToken, Createcomment);


export default commentrouter;




