import mongoose from "mongoose";


// student shcema design 
const userSchema = mongoose.Schema({
    name : {
        type: String,
        trim: true
    },
    email : {
        type: String,
        trim: true,
        unique: true
    },
    cell : {
        type: String,
        trim: true,
    },
    username : {
        type: String,
        trim: true,
        unique: true
    },
    age : {
        type: String
    },
    gender : {
        type: String
    },
    password : {
        type: String,
        trim: true
    },
    photo : {
        type: String
    },
    isVerify : {
        type: Boolean,
        default: false
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    status : {
        type: Boolean,
        default: true
    },
    trash : {
        type: Boolean,
        default: false
    }
}, {
    timestamps : true
});





// export default 
export default mongoose.model('users', userSchema);
