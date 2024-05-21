import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../Utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = (req, res,next) => {
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
export const signin = async (req,res,next)=>{
    const {email , password} = req.body
    try{
        const validUser = await User.findOne({email})
        if(!validUser) {
            return next(errorHandler(404,'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(401,'wrong credentials'))

        }
        const {password:hashedPasword,_id :id,...rest} = validUser._doc 
        const token = jwt.sign({id : validUser._id},'SECRET KEY')
        const expiryDate  = new Date(Date.now()+3600000)
        res.cookie('access_token',token,{httpOnly : true ,expires : expiryDate}).status(200).json(rest)
    }
    catch(err){
        next(err)
    }
}



