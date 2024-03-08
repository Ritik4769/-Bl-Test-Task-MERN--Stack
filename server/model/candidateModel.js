import mongoose from "../connection/dbConfig.js";

var RegistrationSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
  
});

export default mongoose.model('RegistrationModel',RegistrationSchema,'users');