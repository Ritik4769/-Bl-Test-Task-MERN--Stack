import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/indexRouter.js';
import candidateRouter from './routes/candidateRouter.js';
import chatRouter from './routes/chatRouter.js';
import messageRouter from './routes/messageRouter.js';
import http from 'http';
import { Server } from "socket.io";;
var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use("/",indexRouter);
app.use("/candidate",candidateRouter);
app.use("/chat",chatRouter);
app.use("/message",messageRouter);

app.listen(3001,()=>{
    console.log("Server connection successful");
});
