import express from 'express';
const allusers = express.Router();
import {verifyToken} from '../middleware/verify.user.js';
import { getallusers, deleteUsers, getUser } from '../controller/allusers.controller.js';

//ALL users routes
allusers.get('/allusers', verifyToken, getallusers);
allusers.delete('/deleteusers/:userId', verifyToken, deleteUsers);
allusers.get('/:userId', getUser);

export default allusers;



