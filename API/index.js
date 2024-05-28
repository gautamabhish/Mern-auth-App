import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js'
import cookieParser from 'cookie-parser';
const app = express();

mongoose.connect("mongodb://localhost:27017/Mern-auth").then(() => {
    console.log("connected")
}).catch((err) => {
    console.log(err)
});

app.listen(3000, () => {
    console.log("server initialised !");
});

app.use(express.json())

app.use(cookieParser())

app.use("/auth/user",userRoute);

app.use("/api/auth",authRoute);



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success : false ,
        message ,
        statusCode,
    });
});

