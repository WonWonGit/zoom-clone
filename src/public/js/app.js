const socket = io();

const welcome= document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName;

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText=`RoomName ${roomName}`;
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    //socket.send(String) 대신 아무 event를 만들어서 object를 전달
    socket.emit("enter_room",input.value,showRoom);
    roomName = input.value;
    input.value="";
}

form.addEventListener("submit",handleRoomSubmit);

function addMessage(msg) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = msg;
    ul.appendChild(li);
}

socket.on("welcome",()=>{
    addMessage("someone Join!");
})