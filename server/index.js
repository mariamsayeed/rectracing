const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require("cors");

const app = express();
app.use(cors({origin: ["http://localhost:3000","https://rectracing12.vercel.app/"] }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: ['http://localhost:3000',"https://rectracing12.vercel.app/"] });

//data access point 
var i=0;
const room = {};

function getRoomForAccessKey(accessKey){
  if(room[accessKey] === undefined) {
    room[accessKey]=++i;
  }
  return room[accessKey];
}
function validateAccessKey(accessKey){
    if(room[accessKey] === undefined) {
        return false;
    }
    return true;
}

io.on("connection", (socket) => {
    console.log("a user connected");
    const accessKey = socket.handshake.auth.accessKey;
    console.log(accessKey);
    const roomId = getRoomForAccessKey(accessKey);
    if (!validateAccessKey(accessKey)) {
        socket.disconnect();
        console.log("invalid access key");
        return;
    }
    socket.join(roomId);
    console.log(socket.rooms)

    socket.on('beginPath', (arg) => {
        io.to(roomId).emit('beginPath', arg);
    })
    socket.on('drawLine', (arg) => {
        io.to(roomId).emit('drawLine', arg);
    })
    socket.on('changeConfig', (arg) => {
        io.to(roomId).emit('changeConfig', arg);
    })
});


httpServer.listen(5000);

