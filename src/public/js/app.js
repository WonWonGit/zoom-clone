const messageList = document.querySelector("ul");
const messageFrom = document.querySelector("#msg");
const nicknameFrom = document.querySelector("#nickname");
const aSocket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload}
    return JSON.stringify(msg)
}

aSocket.addEventListener("open",()=>{
    console.log("Connected to Server:D");
})

aSocket.addEventListener("message",(message)=>{
    console.log("New message : ",message.data);
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

aSocket.addEventListener("close",()=>{
    console.log("Disconnected to Server :(")
})

messageFrom.addEventListener("submit", (event)=>{
    event.preventDefault();
    const input = messageFrom.querySelector("input");
    aSocket.send(makeMessage("new_message",input.value));
    console.log(makeMessage("new_message",input.value))
    input.value="";
})

nicknameFrom.addEventListener("submit", (event)=>{
    event.preventDefault();
    const input = nicknameFrom.querySelector("input");
    aSocket.send(makeMessage("nickname",input.value));
})