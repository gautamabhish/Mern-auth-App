import express from 'express'
import mongoose from 'mongoose'
import router from './routes/userRoute.js';
import authRoute from './routes/authRoute.js'

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

app.use("/auth/user",router);

app.use("/api/auth",authRoute);

