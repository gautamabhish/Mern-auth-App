import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js'
import cookieParser from 'cookie-parser';
import path from 'path'
import dotenv from 'dotenv'
dotenv.config();
const app = express();

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname ,'/Client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'Client','dist','index.html'))
})

mongoose.connect(`mongodb+srv://abhishekgautam080470:${process.env.DATABASE}@c1.axqj0ho.mongodb.net/?retryWrites=true&w=majority&appName=c1`).then(() => {
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

