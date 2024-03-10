import React, { useEffect, useState } from 'react';
import { user } from '../Login/Login';
import { endpoint } from '../../Staticfiles/static';
import socketIo from 'socket.io-client';
import Messages from '../Messages/Messages';
import ReactScrollToBottom from "react-scroll-to-bottom"
import './Chat.css';
let socket;
const Chat = () => {
    const[messages,setmessages]=useState([]);
    const[inputmsg,setinputmsg]=useState("");
    const [id,setid]=useState("")
    const send=()=>{
        socket.emit("newmsg",{inputmsg,id})
        document.getElementById("chatInput").value="";

    }
   
    useEffect(() => {
         socket = socketIo(endpoint, {
            transports: ['websocket']
        });

        socket.on('connect', () => {
            alert(`${user} has logged in`);
            setid(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setmessages([...messages,data]);
            console.log(`${data.user} says ${data.msg}`);
        });

        socket.on('userJoined', (data) => {
            setmessages([...messages,data]);
            console.log(`${data.user}${data.msg}`);
        });
        socket.on('left', (data) => {
            console.log(`${data.msg}`);
        });
        // Cleanup function
        return () => {
            console.log('Cleanup function executed');
            socket.emit('Disconnect'); // Emitting the disconnect event
            socket.off(); // Removing all event listeners
        };
    }, []); // Empty dependency array means the effect runs only once
    useEffect(()=>{
      socket.on("sendmsg",(data)=>{
        const propermsg={
            user:data.user,
            msg:data.message,
            id:data.id
        }
        setmessages([...messages,propermsg])
         console.log(data.user , data.message,data.id);
      })
      return ()=>{
        socket.off();
      }

    },[messages])
    console.log(messages);
    return (
        <div className="ChatPage">
            <div className="chatContainer">
                <div className="header"></div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item,i)=><Messages user={item.user} message={item.msg} classs={item.id===id?'right':'left'}/>)}
                </ReactScrollToBottom>
                <div className="inputbox">
                    <input onChange={(e)=>setinputmsg(e.target.value)} id="chatInput" type="text" />
                    <button  onClick={send} className="sendBtn">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;