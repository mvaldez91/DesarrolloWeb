global.socket = null
const app = require("./app")
const http = require('http')
const { socketConnection } = require('./services/sockets');

const server = http.createServer(app)
socketConnection(server)
server.listen(4000, ()=>{
    console.log("Server running in port 4000")
})

