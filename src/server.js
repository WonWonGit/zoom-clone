import http from "http";
import SocketIO from "socket.io";
import express from "express";
import e from "express";

const app = express();

app.set("view engine","pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname+"/public"));

app.get("/",(req, res) => res.render("home"));
app.get("/*",(req, res) => res.redirect("/"))
const handleListen = () => console.log(`Listening http://localhost:3000`);

const server = http.createServer(app);
const wsServer = SocketIO(server);

wsServer.on("connection", (socket)=>{
    socket.onAny((event)=>{
        console.log(`Socket Event: ${event}`);
    })
    socket.on("enter_room",(roomName, done)=>{
        //socket.id == socket.rooms socket은 각가의 아이디를 가지고 있음
        socket.join(roomName); //방에들어가는 기능
        done();
        socket.to(roomName).emit("welcome");
        //leave 방을 나가는 기능
        //to(room) 방에 메세지보내기 기능
    });
})


// const sockets = [];
//
// wss.on("connection",(socket)=>{
//     sockets.push(socket);
//     socket["nickname"] = "Anon";
//     console.log("Connected to the Browser:D");
//     socket.on("close",()=>console.log("Disconnected to the Browser:("));
//     socket.on("message", (msg) =>{
//         const message = JSON.parse(msg)
//         console.log(msg.toString());
//         switch (message.type){
//             case "new_message":
//                 sockets.forEach((bSocket)=>
//                     bSocket.send(`${socket.nickname}: ${message.payload}`));
//                 console.log(message);
//                 break;
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         }
//     });
// });

server.listen(3000,handleListen);