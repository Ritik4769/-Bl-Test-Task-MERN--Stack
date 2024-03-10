import { useState, useEffect, useRef } from 'react';
import jscookie from 'js-cookie';
import { useLocation } from "react-router-dom";
import { findMessages } from "../store/messageSlice.js";
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';

import { sendMessage } from "../store/messageSlice.js";
function Chat() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [newmessage, setMessage] = useState("");
    var [allMessages, SetAllMessages] = useState([]);
    const [OnlineUsers, setOnlineUsers] = useState([]);

    var [reciverId, setReciverId] = useState(location.state.email)
    // console.log(location.state.email);
    var [chatId, setChatID] = useState(location.state.chat_ID)
    const socket = useRef()
    const userEmail = jscookie.get("candidate_email");

    // console.log("chatId : ", chatId);

    useEffect(() => {
        
        findMessages(chatId).then((data) => {
            if (data) {
                console.log(data);
                SetAllMessages([])
                SetAllMessages(data)
            }
        })
    }, [chatId])



    useEffect(() => {
        // console.log("inside use effect");
        socket.current = io("http://localhost:8800/chat");
        socket.current.emit("new-user-add", userEmail);
        socket.current.on("get-users", (users) => {
            setOnlineUsers([...users]);
            // console.log("active users", users);
        });
        socket.current.on("recive-message", (data) => {
            // console.log("recived messavge", data);

            SetAllMessages((allMessages) => [...allMessages, data]);
        });
    }, []);


    async function sendMessageFunction() {
        if (newmessage) {
            const message = {
                reciverId: reciverId,
                text: newmessage,
                chatId: chatId,
                senderId: userEmail
            };
            dispatch(sendMessage({message}))

            socket.current.emit("send-message", message);
            allMessages = [...allMessages, message]
            SetAllMessages([...allMessages])
            var inputField = document.getElementById("textarea");
            inputField.value = "";
            setMessage("")
        }

    }

    function setMessageFunction(newmessage) {
        console.log(newmessage.target.value);
        setMessage(newmessage.target.value)
        // console.log(reciverId);
    }

    return (

        <>
            <section className="w-50 mx-auto my-5 p-1 rounded" style={{ height: 'auto', border: '1px solid rgba(0,0,0,0.2)' }}>
                <div className="bg-dark p-3">
                    {/* <img height="40" src="/wassup.png" alt=""> */}
                    <h3 style={{ color: 'white', textTransform: 'capitalize' }}>{reciverId}</h3>
                </div>
                <div className="p-2" style={{ maxHeight: "70vh", overflow: "scroll", scrollbarColor: "transparent" }} >
                    {
                        allMessages.map((data, index) => {
                            if (data.senderId == userEmail) {
                                return (<>
                                    <div className="w-100 d-flex justify-content-end ">
                                        <div className=" d-inline bg-success px-2 py-1 rounded m-2" style={{ border: '1px solid lightgrey', color: 'white' }}>{data.text}</div>
                                    </div>
                                </>)
                            }
                            else {
                                return (<>
                                    <div className="w-100 d-flex justify-content-start" >
                                        <div className="bg-dark d-inline px-2 py-1 m-2 rounded" style={{ border: '1px solid lightgrey', color: 'white' }}>{data.text}</div>
                                    </div>
                                </>)
                            }

                        })
                    }
                </div>
                <div></div>
                <div className="w-100 mx-auto d-flex justify-content-end py-2">
                    <input id="textarea" className="form-control w-50" onChange={setMessageFunction} placeholder="Write a message..." />
                    <button className="btn btn-success" onClick={sendMessageFunction} ><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                </div>
            </section>
        </>

    );
}
export default Chat;