import Candidate from '../model/candidateModel.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
var secret_key = process.env.CANDIDATE_SECRET_KEY;

export const candidateRegistrationController = async (request, response) => {
  console.log("#######################", request.body);
  try {
    const { name, email, password, contact } = request.body;
    var obj = {
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      contact: contact

    }
    const data = await Candidate.create(obj);
    if (data) {
      response.status(201).json({ message: "register successfully..... " })
    }

  } catch (err) {
    console.log("candidate Registration Error : " + err);
  }

};

export const candidateEmailController = async (request, response) => {
  var email = request.query.email;
  var updateStatus = { $set: { emailverify: "Verified" } };
  var res = await Candidate.updateOne({ _id: email }, updateStatus);
  console.log("Email verified : " + res);
  response.render("candidateLogin", { message: "Email Verified Succesfully" });
};


export const candidateLoginController = async (request, response) => {
  const { email, password } = request.body;
  try {
   
    var candidateObj = await Candidate.findOne({ email: email });
    console.log("candidateObj : ", candidateObj)
    var candidatePassword = candidateObj.password;
    var status = await bcrypt.compare(password, candidatePassword);
    console.log(status);
    if (status) {
      
      response.status(201).json({ candidateemail: email });
    } else {
     
      response.status(203).json({ message: "Error while Login" });
    }
  } catch (err) {
    console.log("Error in candidate login controller : " + err);
    response.status(203).json({ message: "Error while Login" });
  }
};


export const showcandidateController = async (req, res) => {
  console.log("yyyyyyyyyyyyyy")
  try {
    var data = await Candidate.find();
    console.log("data99999 ",data);
    if (data) {
      res.status(201).json({ data: data })
    } else {
      res.status(404).json({ data: "ewrror" })
    }
  } catch (error) {
    console.log("error : ",error);
  }

}




// email : kotharigaurav6@gmail.com
// password : gaurav@123