import mongoose from 'mongoose';
//mongoose.connect("mongodb://127.0.0.1:27017/facultyrecruitmentitep5");
//  mongoose.connect("mongodb+srv://kotharigaurav6:gaurav_kothari1992@cluster0.m0bpqsg.mongodb.net/FacultyRecruitmentSystem?retryWrites=true&w=majority");
 mongoose.connect("mongodb+srv://ritikbhondve:bPXllZ6KYVuEf6z9@cluster0.yffdmom.mongodb.net/BrainInventoryTask")
 .then(()=>{
    console.log("Connection sucessfull");
 })
 .catch((err)=>{
    console.error("Hi",err);
 });

export default mongoose;