import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../Utils/error.js"

export const auth = (req, res,next) => {
    const { userName, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({ userName, email, password : hashedPassword})
    async function userSave(){ 
        try{
        await newUser.save()
        res.status(201).json({message: "User saved !"})
        }
        catch(err){
            next(err)
  
        }
     }
    userSave()

    

}



