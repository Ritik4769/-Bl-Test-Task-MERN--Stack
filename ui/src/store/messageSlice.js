import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    chatData:{}
}

const messageSlice = createSlice({
    name:"messageSlice",
    initialState,
    reducers:{
        sendMessage:async (state, action) => {
         try {
            var result  = await axios.post('http://localhost:3001/message',action.payload.message);
                // console.log("Inside send meassage slice",result.data);

         } catch (error) {
                    console.log("error ------ ",error);

         }
        }
    }
});

export const findMessages = async(payload)=>{
    try{
        var result  = await axios.get(`http://localhost:3001/message/${payload}`)
        // console.log("Inside Finf messages Slice");
        return result.data;
    }catch(error){
        console.log(error);
    }
}


export const { sendMessage } = messageSlice.actions;

export default messageSlice.reducer;