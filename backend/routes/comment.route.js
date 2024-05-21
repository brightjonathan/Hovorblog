import express from 'express';
import { verifyToken } from '../middleware/verify.user.js';
import { 
    Createcomment, 
    deleteComment, 
    getPostComments, 
    likeComment, 
    editComment, 
    getcomments
} from '../controller/comment.controller.js';


const commentrouter = express.Router();


commentrouter.post('/createcomment', verifyToken, Createcomment);
commentrouter.get('/getPostComments/:postId', getPostComments);
commentrouter.put('/likeComment/:commentId', verifyToken, likeComment);
commentrouter.delete('/deleteComment/:commentId', verifyToken, deleteComment);
commentrouter.put('/editcomment/:commentId', verifyToken, editComment);
commentrouter.get('/getcomments', verifyToken, getcomments);


export default commentrouter;




