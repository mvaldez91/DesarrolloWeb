//Importar con commonJS
//const operaciones = require('./modulo_cs')
const {sumar, restar} = require('./modulo_cs')
//const restar = require('./modulo_cs')


//Forma completa
//console.log(operaciones.sumar(1, 5))
//console.log(operaciones.restar(1, 5))

//Forma moderna con destructuracion
console.log(sumar(1, 5))
console.log(restar(1, 5))
