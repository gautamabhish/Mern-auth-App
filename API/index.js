import express from 'express'
import mongoose from 'mongoose'
import router from './routes/userRoute.js';

const app = express();

mongoose.connect("mongodb://localhost:27017").then(() => {
    console.log("connected")
}).catch((err) => {
    console.log(err)
});

app.listen(3000, () => {
    console.log("server initialised !");
});



app.use("/",router);
