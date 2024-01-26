import express from 'express';
const userProfile = express.Router();
import { VerifyUserToken } from '../middleware/verify.user.js';
import { 
    getUser,
    updatedUser
} from '../controller/profile.controller.js';

//ALL profile routes
userProfile.get('/getuser', VerifyUserToken, getUser);
userProfile.patch('/updateprofile', VerifyUserToken, updatedUser);

export default userProfile;



