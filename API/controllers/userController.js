import { errorHandler } from "../Utils/error.js"
import bcryptjs from 'bcryptjs'
import User from "../models/userModel.js"
export const testRoute = (req,res)=>{
    res.json({
        message : 'API is working'
    })
}

export default async  function updateUser(req,res,next){
    if (req.decodedUser.id !== req.params.id) {
        return next(errorHandler(401,'You can update your own account only'))
    }

    try {
        if (req.body.password){
            req.body.password =  bcryptjs.hashSync(req.body.password,10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set :{
                userName : req.body.userName,
                email : req.body.email,
                password : req.body.password,
                profilePicture : req.body.profilePicture
            }
        },{new:true}
    );
    const {password,...rest} = updatedUser._doc
    res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}


