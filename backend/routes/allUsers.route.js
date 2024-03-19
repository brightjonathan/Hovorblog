import express from 'express';
const allusers = express.Router();


import {verifyToken} from '../middleware/verify.user.js';
import { getallusers } from '../controller/allusers.controller.js';

//ALL users routes
allusers.get('/allusers', verifyToken, getallusers);

export default allusers;



