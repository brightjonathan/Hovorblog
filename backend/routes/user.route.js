import express from 'express';
import {
    signup,
    signin,
    signout,
    google
} from '../controller/user.controller.js';
const userRouter = express.Router();

//auth routes
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.get('/signout', signout);
userRouter.post('/google', google);

export default userRouter;


