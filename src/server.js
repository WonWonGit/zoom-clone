import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine","pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname+"/public"));

app.get("/",(req, res) => res.render("home"));
app.get("/*",(req, res) => res.redirect("/"))
const handleListen = () => console.log(`Listening http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection",(socket)=>{
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to the Browser:D");
    socket.on("close",()=>console.log("Disconnected to the Browser:("));
    socket.on("message", (msg) =>{
        const message = JSON.parse(msg)
        console.log(msg.toString());
        switch (message.type){
            case "new_message":
                sockets.forEach((bSocket)=>
                    bSocket.send(`${socket.nickname}: ${message.payload}`));
                console.log(message);
                break;
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
});

server.listen(3000,handleListen);