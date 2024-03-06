const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app); //create web server

app.use("/", (req, res) => {
  res.send("Server is running")
})


const io = new Server(server, {

 /*  
 UNCOMMENT THIS WHEN YOU ARE RUNNING THIS CHAT APP LOCALLY AND COMMENT BELOW IF NOT
 cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }, */

  
 cors: {
    origin: "https://convochat-vdu0.onrender.com",
    methods: ["GET", "POST"],
  }, 

  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
});

const users = [];

const socketRoom = [];

//connect socket io to client side
io.on("connection", (socket) => {
  //for debugging
  console.log(`User Connected: ${socket.id}`);

  //listening from client-side if new user joined the room
  socket.on("joinRoom", (data) => {
    socket.join(data.room);
    console.log("room data", data.room);
    //limiting logged user inthe room
    const length = io.sockets.adapter.rooms.get(data.room).size;

    //up to 2 users, if exceed newly joined user will auto leave the room
    if (length > 2) {
      console.log("full for 2 person only");
      console.log("room size", length);
      socket.leave(data.room, () => {
        console.log("left coz full user:", socket.id);
      });

      //to notify the client-side that the room is full
      socket.emit("full", () => {
        console.log("passed full");
      });
    } else {
      //if not full, will enter the room
      socket.to(data.room).emit("joinMember", data);
      console.log(
        `User with ID: ${socket.id} joined room : ${data.room} user: ${data.username} `
      );
    }
  });

  socket.on("changeUsername", (data) => {
    console.log("debug", data)
    socket.to(data.room).emit("editUsername", data)
  })

  //notify client-side the socket-id
  socket.emit("me", socket.id);

  //listening from client-side if video call and will emit to
  // the room that the other user is video calling
  socket.on("videoCall", (data) => {
    socket.to(data).emit("videoAccepted");
  });

    //listening from client-side if audio call and will emit to
  // the room that the other user is audio calling
  socket.on("audioCall", (data) => {
    socket.to(data).emit("audioAccepted");
  });

  //listening from client-side if there is trigger for a call
  //then will emit for client-side  to notify that the other user in the room is calling 
  //call is based on the room name instead of socket-id
  socket.on("call_User", (data) => {
    console.log(`incoming call from ${data.from}`);
    console.log(`Sending call signal to user ${data.userToCall}`);
    socket.to(data.room).emit("call_User", {
      userToCall: data.userToCall,
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  //listening from client-side if there is a call need to answer
  //then will emit for client-side to notify that the other user in the room is calling 
   //answering call is based on the room name instead of socket-id
  socket.on("answerCall", (data) => {
    console.log(`Answering Call from signal ${data.signal} to ${data.to}`);
    const response = users.filter((item) => item === data.to);
    io.to(data.to).emit("callAccepted", data.signal);
  });


  //listening if the call is disconnected and will emit that the call is disconnected
  //to client-side to notify the other user got disconnected
  socket.on("gotDisconnected", (room) => {
    socket.to(room).emit("callDisconnected", () => {
      console.log("end call");
    });
  });

 
  //for sending and receiving message
  //server will listen for the sent message from client-side and
  //server will emit that the msg is receive then sent to all user in the room
  //sending and receiving message is based on room name instead of socket.id
  socket.on("sendMessage", (data) => {
    const received = true
    socket.to(data.room).emit("receiveMessage", data, received);
    console.log("msg", data);
  });

  //listening from client-side if user will leave the room 
  //then the user socket id will leave the room
  socket.on("exitRoom", (data) => {
    socket.to(data.room).emit("exitUser", data)
    console.log(
      `User with ID: ${socket.id} left room : ${data.room} user: ${data.username}`
    );
    socket.leave(data.room);
 
  });


  //listen to socket disconnect
  socket.on("disconnect", (data) => {
    console.log("User Disconnected", socket.id);
    socket.broadcast.emit("callEnded");
  });

});

server.listen(3001, () => {
  console.log("server running");
});
