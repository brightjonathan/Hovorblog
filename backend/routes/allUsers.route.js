import express from 'express';
const allusers = express.Router();
import {verifyToken} from '../middleware/verify.user.js';
import { getallusers, deleteUsers } from '../controller/allusers.controller.js';

//ALL users routes
allusers.get('/allusers', verifyToken, getallusers);
allusers.delete('/deleteusers/:userId', verifyToken, deleteUsers)

export default allusers;



