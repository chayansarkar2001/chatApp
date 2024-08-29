import { io } from "socket.io-client"

// const socket = io("http://localhost:3000", {
//     autoConnect: false
// })

const socket = io("https://chatappserver-dhqc.onrender.com/", {
    autoConnect: false
})

export default socket

// you will need to call socket.connect() to make the Socket.IO client connect.