const socket = io({
  auth: {
    // token : "token@1"
    token: localStorage.getItem('token')
  }
});
const form = document.getElementById('form');
const message = document.getElementById('input');
const reload = document.getElementById('reload');
const join = document.getElementById('join');
const room = document.getElementById('roomDropdown');
let token=localStorage.getItem('token');
let messagesList= document.getElementById('messages');

if(room.value!=''){
    join.addEventListener('click',()=>{
      socket.emit('join-room',room.value,token) 
    })

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(message.value!='')
    {
      socket.emit('send-message',room.value,message.value);
      message.value='';
    }
});

reload.addEventListener('click',()=>{
    socket.emit('get-older-messages',room.value);
});

socket.on('introduction', (msg) => {
    const newMessage = document.createElement('li');
    newMessage.textContent = msg;
    messagesList.appendChild(newMessage);
});

socket.on('recieve-older-message',(data)=>{
    console.log("DATA",data);
    messagesList.innerHTML='';
    data.forEach(element => {
      const newMessage = document.createElement('li');
      newMessage.textContent = element;
      messagesList.appendChild(newMessage);
  });
});

socket.on('response',(msg)=>{
   const newMessage = document.createElement('li');
   newMessage.textContent = msg;
   messagesList.appendChild(newMessage);
})

socket.on('connect_error', (err) => {
    console.log("Got an error in middleware");
    console.log(err.message); 
});

socket.on('disconnect',()=>{
  alert("relogin,session timed-out or invalid credentials");
})

socket.on('token-check',()=>{
  socket.emit('check-token',token);
})

}



