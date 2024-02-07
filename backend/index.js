import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from 'dotenv';

//all import file coming from a folder
import db from './Config/db.js';
import userRouter from "./routes/user.route.js";
import profileRouter from "./routes/profile.route.js";


//connections to database
db();
dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("common"));

// Add body-parser middleware with a higher limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


//for all routes end-points
app.use('/api/auth', userRouter);
app.use('/api/profile', profileRouter);


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




