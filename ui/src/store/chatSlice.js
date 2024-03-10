import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    chatData:{}
}

const chatSlice = createSlice({
    name:"chatSlice",
    initialState,
    reducers:{}
});


export const createChat = async(payload)=>{
    try{
        // console.log("this is the payloads in create chat ",payload);

        var result  = await axios.post(`http://localhost:3001/chat`,payload);
        // console.log("Inside create chat chatSlice",result.data.chatID);
        return result.data.chatID;
    }catch(error){
        console.log(error);
    }
}

export default chatSlice.reducer;