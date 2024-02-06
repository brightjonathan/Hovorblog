import express from 'express';
const userProfile = express.Router();
import { VerifyUserToken} from '../middleware/verify.user.js';
import { 
    updatedUser
} from '../controller/profile.controller.js';

//ALL profile routes
userProfile.patch('/updateprofile/:userId', updatedUser);

export default userProfile;



