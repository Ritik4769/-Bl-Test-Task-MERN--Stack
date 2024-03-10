import {configureStore} from '@reduxjs/toolkit';
import candidateSlice from './candidateSlice.js';
import messageSlice from './messageSlice.js';
import chatSlice from './chatSlice.js';
export default configureStore({
   
    reducer : {
        candidateSlice : candidateSlice,
        messageSlice:messageSlice,
        chatSlice:chatSlice
    }
    
});