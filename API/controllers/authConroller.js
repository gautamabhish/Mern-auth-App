import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'

export const auth = (req, res) => {
    const { userName, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({ userName, email, password : hashedPassword})
    async function userSave(){ 
        try{
        await newUser.save()
        res.status(201).json({message: "User saved !"})
        }
        catch(err){
            res.status(500).json({message : "Encountering Error"})
  
        }
     }
    userSave()

    

}



