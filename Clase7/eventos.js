//Modulo de eventos
const EventEmitter = require("events")

const eventEmitter = new EventEmitter();

eventEmitter.on('start', (e)=>{
  console.log("Started, data="+e)
})

eventEmitter.emit("start", "Hola")

setTimeout(()=>{
    console.log("Hola despues de 3 segundos")
}, 3000)

setInterval(()=>{
    console.log("Mensaje cada 5 segundos")
},5000)