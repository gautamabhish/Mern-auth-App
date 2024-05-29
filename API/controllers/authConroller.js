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
        const {password:hashedPasword,...rest} = validUser._doc 
        const token = jwt.sign({id : validUser._id},'SECRET KEY')
        const expiryDate  = new Date(Date.now()+3600000)
        res.cookie('access_token',token,{httpOnly : true ,expires : expiryDate}).status(200).json(rest)
    }
    catch(err){
        next(err)
    }
}
export const googleAuth = async (req,res,next)=>{
    
    try{
        
        const user = await User.findOne({email:req.body.email})
        if(user) {
            const token = jwt.sign({id : user._id},'SECRET KEY')
            const {password:hashedPassword,...rest} = user._doc
            const expiryDate  = new Date(Date.now()+3600000)
            res.cookie('access_token',token,{httpOnly : true ,expires : expiryDate}).status(200).json(rest)
            
        }


        else{
            const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10)
            
            const userName = req.body.userName.split(' ').join('') + Math.floor(Math.random() * 10000).toString()
            
            const newUser = new User(
                {   userName,
                    email: req.body.email,
                    profilePicture :req.body.photo,
                    password :hashedPassword
                    
                    
                })
                
           
             await newUser.save()
             const createdUser = await User.findOne({userName})
             const token = jwt.sign({id : createdUser._id},process.env.JWT_SECRET)
            const {password:hashedPasword,...rest} = createdUser._doc
            const expiryDate  = new Date(Date.now()+3600000)
            res.cookie('access_token',token,{httpOnly : true ,expires : expiryDate}).status(200).json(rest)
        }
        
         
       
    }
    catch(err){
        next(err)
    }
}



