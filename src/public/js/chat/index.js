const socket = io()

socket.emit("message", "Mensaje enviado desde el front")

let chatInput = document.getElementById("chatInput")
let chatBox = document.getElementById("chatBox")
let username


socket.on("messages", (data)=>{
    let msg = ""

    data.forEach((m) => {
        msg += `<strong>${m.username}: </strong>${m.message}</br>`
    })
    chatBox.innerHTML= msg
})

Swal.fire({
    title:"Bienvenidos",
    input: "text",
    text:"Ingresa tu nombre de usuario",
    inputValidator: (value)=> {
        return !value && "Es obligatorio un nombre de usuario"
    },
    allowOutsideClick: false
}).then((result)=> {
    username = result.value
})

chatInput.addEventListener("keyup", (ev)=>{
    if(ev.key === "Enter"){
        const inputMsg = chatInput.value
        if(inputMsg.trim().length > 0){
            socket.emit("chat-message", {username, message: inputMsg})
            chatInput.value= ""
        }
    }
})
