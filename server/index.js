const http=require('http');
const express=require('express');
const cors=require('cors');
const SocketIO=require('socket.io');
const { Socket } = require('dgram');

const app=express();
const port=4500|| process.env.port
const server=http.createServer(app);
let users=[];
//passing server inside socketio
app.get("/",(req,res)=>{
    res.send("it is working");
})
//right now it is used to start the io events
const io=SocketIO(server); 
io.on("connection",(socket)=>{
    console.log("it is working");
    socket.on('joined',({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`);
        socket.emit("welcome",{user:"Admin",msg:`Welcome to C chat ${users[socket.id]}`})

        socket.broadcast.emit('userJoined',{user:users[socket.id],msg:" has joined server",id:socket.id})
    })
    socket.on('newmsg',(data)=>{
          io.emit("sendmsg",{user:users[socket.id],message:data.inputmsg,id:data.id})
    })
    socket.on('Disconnect',()=>{
        socket.broadcast.emit("left",{user:users[socket.id],msg:" has left server"})
        console.log(`${users[socket.id]} has left`);
    })
   })

server.listen(port,()=>{

    console.log(`server is running on http://localhost:${port}`)
})