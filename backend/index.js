//all the dependencies imported
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from 'dotenv';
import path from 'path';

//all import file coming from a folders
import db from './Config/db.js';
import userRouter from "./routes/user.route.js";
import profileRouter from "./routes/profile.route.js";
import postrouter from "./routes/post.route.js";
import allusers from "./routes/allUsers.route.js";
import commentrouter from "./routes/comment.route.js";



//connections to database
db();
dotenv.config();


const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Add body-parser middleware with a higher limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


//for all routes end-points
app.use('/api/auth', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postrouter);
app.use('/api/users', allusers);
app.use('/api/comments', commentrouter);

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "img-src 'self' data: https://firebasestorage.googleapis.com;"
  );
  next();
});



//it has to be after the api routes
app.use(express.static(path.join(__dirname, '/client-app/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-app', 'dist', 'index.html'));
})


//local host connection 
const port = 4000;
app.listen(port, ()=>{
 console.log(`server is running on port ${port}!!!`);
});


//middleware for handling errors 
app.use((err, req, res, next)=>{
    const statuscode  = err.statuscode || 500;
    const message = err.message || 'internal Server error';
    return res.status(statuscode).json({
      success: false,
      statuscode,
      message,
    });
});






