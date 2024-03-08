import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { candidate_requestedUrl,appliedVacancy_requestedUrl } from "../urls.js";
import jscookie from 'js-cookie';

const initialState = {
    message:"",
   email:""
}

const candidateSlice = createSlice({
    name:'candidateSlice',
    initialState,
    reducers : {}
});

export const addCandidate =async (formData)=>{  
    try{
        console.log("form data : ",formData);
        var result = await axios.post(candidate_requestedUrl+'/candidateRegister',formData); 
        console.log("candidateSlice : ",result);
        // console.log("token : ",result.data.token);
        // jscookie.set('candidate_jwt_token',result.data.token,{expires:1});
    }catch(err){
        console.log("error in candidateSlice : ",err);
    }
}

export const candidateLogin =async (candidateCredential)=>{  
    try{
        console.log(candidateCredential);
        var result = await axios.post(candidate_requestedUrl+'/candidateLogin',candidateCredential); 
        console.log("candidateSlice : ",result);
        // console.log("token : ",result.data.token);
        if(result.status==201)
           jscookie.set("candidate_email",candidateCredential.email);
 
        // jscookie.set('candidate_jwt_token',result.data.token,{expires:1});
        return result;
    }catch(err){
        console.log("error in candidateSlice : ",err);
    }
}



export const {setEmail} = candidateSlice.actions;
export default candidateSlice.reducer;