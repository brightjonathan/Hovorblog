import express from 'express';
import { verifyToken } from '../middleware/verify.user.js';
import { createpost} from '../controller/post.controller.js';

const postrouter = express.Router();

postrouter.post('/create', verifyToken, createpost);

export default postrouter;




