import mongoose from 'mongoose';
 mongoose.connect("mongodb+srv://ritikbhondve:bPXllZ6KYVuEf6z9@cluster0.yffdmom.mongodb.net/BrainInventoryTask")
 .then(()=>{
    console.log("Connection sucessfull");
 })
 .catch((err)=>{
    console.error("Hi",err);
 });

export default mongoose;