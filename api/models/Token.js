import mongoose from "mongoose";



// create token modal
const tokenSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }, 
    token : {
        type : String,
        required : true
    },    
    secretKey : {
        type : Number,
        required : true
    }
}, {
    timestamps : true
});

// export
export default mongoose.model('Token', tokenSchema);