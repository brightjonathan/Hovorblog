import express from 'express';
//import { verifyToken } from '../utils/verifyUser.js';
import { createpost} from '../controller/post.controller.js';

const postrouter = express.Router();

postrouter.post('/create', createpost);

export default postrouter;


