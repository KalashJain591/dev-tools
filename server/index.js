const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { join } = require('path');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app); 
const io = new Server(server);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY
const msgMap = {};


const isValid=(token)=>{
   const result = jwt.verify(token, JWT_KEY, (err) => {
        if(err){
            console.log('token invalid :' ,err );
            return false;
        } else {
            return true;
        }
    })
    return result ;
}

const sendTokenCheck=(socket)=>{
    setInterval(()=>{
        socket.emit('token-check');
    },60000)
}

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname, '/home.html'));
})

app.get('/register',(req,res)=>{
    res.sendFile(join(__dirname, '/login.html'));
})


app.post('/register',(req,res)=>{
    const {name, pass}=req.body;
    jwt.sign({name,pass}, JWT_KEY, {expiresIn: '1h'},(err, token) => {
        if(err){
             console.log(err) 
        }
        else{    
            res.send(token);
        }
    });
})


mongoose.connect("mongodb://mongodb:mongodb@localhost:27019/")
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });


io.on('connection', (socket) => {
    const token = socket.handshake.auth.token;
    if(!isValid(token)){
        console.log("token is not valid 1");
        socket.disconnect();
    }

    socket.on('join-room', (room,token) => {
        if(!msgMap[room]){
            msgMap[room]=[];
        }
        socket.join(room);
        console.log("join room");
    });


    socket.on('send-message', (room, msg) => {
        msgMap[room].push(msg);
        io.to(room).emit('response', msg); 
    });

    socket.on('get-older-messages',(room)=>{
        socket.emit('recieve-older-message', msgMap[room]);
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('check-token',(token)=>{
        if(!isValid(token)){
            socket.disconnect();
        }     
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
