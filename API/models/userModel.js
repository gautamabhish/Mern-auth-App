import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    userName :{ String,
    required :true,
    unique : true,
    },
    email:{ String,
    required :true,
    unique : true,
    },
    password:{ String,
    required :true,
    // unique : true,
    }
}
,{timestamps:true})


const User = mongoose.model('User' ,userSchema)

export default User