import express from 'express';
const userProfile = express.Router();
import {verifyToken} from '../middleware/verify.user.js';
import { 
    updatedUser
} from '../controller/profile.controller.js';

//ALL profile routes
userProfile.patch('/updateprofile/:userId', verifyToken, updatedUser);

export default userProfile;



