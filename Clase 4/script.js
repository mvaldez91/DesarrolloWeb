//holaDesdeScript2();

function declaracionDeVariables() {
  //forma antigua de declarar.
  var variable = 'Hola mundo'
  //forma con scope limitado
  let variable2 = 'Hola mundo'
  //constantes
  const CONSTANTE_1 = 'Hola mundo'
}

function decisiones() {
  let edad = window.prompt('Ingrese su edad')

  if (edad >= 18) {
    window.alert('Es mayor de edad')
  } else {
    window.alert('Es menor de edad')
  }
}

function calcularDescuento() {
 let categoria = prompt('Ingrese la categoria') * 1
 let monto = prompt("Ingrese el monto") * 1

  let resultado = 0
  switch (categoria) {
    case 1:
      resultado = monto * 0.05
      break
    case 2:
      resultado = monto * 0.1
      break
    case 3:
      resultado = monto * 0.15
      break
    case 4:
      resultado = monto * 0.2
      break
    default:
      break
  }
  alert(calcularDescuento(categoria, monto))
  return resultado
}

function bucles(){
    let arreglo = ["Maiz", "Pan", "Frijol", "Azucar"]
    
    //ciclo for
    for (let i = 0; i < arreglo.length; i++) {
        const element = arreglo[i];
        console.log(element)   
    }
    let i = 0
    console.log('bucle while')
    while (i<arreglo.length){
        const element = arreglo[i]
        console.log(element)
        i ++;
    }
    console.log("For each")
    arreglo.forEach(function (elemento, indice){
        console.log(elemento, indice)
    })
}
function funcionalidadesDeArreglos (){
    let arreglo = ["Maiz", "Pan", "Frijol", "Azucar"]
    let arreglo2 = [1,2,3,4,5,6,7,8]
    
    //findIndex
    let indice = arreglo.findIndex(elemento=> elemento === "Pan");
    console.log("Indice del pan", indice)
    //find
    let elemento = arreglo.find(elemento => elemento === "Pan")
    console.log("Elemento", elemento)

    //map
    let arregloAlCuadrado = arreglo2.map(elemento => elemento ** 2)
    //let arregloAlCuadrado = arreglo2.map(elemento => {
    //    return elemento ** 2;
    //})
    console.log(arregloAlCuadrado)
}

function objetosJavascript(){
    let objeto = {
        nombre: "Juan",
        apellido: "Perez",
        edad: 18,
        materias: [
            "Desarrollo web",
            "Arquitectura",
            "Etica",
            "Redes",
            "Analisis 2"
        ],
        subObjecto : {
            llave1: ""
        }
    }
    let llaves = Object.keys(objeto);
    //Acceso directo por nombre
    objeto.nombre;
    llaves.forEach(llave=>{
        //Acceso con nombre dinamico usando corchetes.
        console.log(objeto[llave])
    })
    //console.log(llaves)
}

//objetosJavascript()

//Callback

function functionQueRecibeUnCallback(funcionInterna){
    console.log("Ejecutando el callback")
    funcionInterna();
}

functionQueRecibeUnCallback(function(){
    console.log("Hola desde el callback 1")
})

functionQueRecibeUnCallback(function(){
    console.log("Hola desde el callback 2")
})

let calculos = {
    1: function(monto){
        return monto + monto * 0.12 + 100;
    },
    2: function(monto){
        return monto + monto * 0.15 + 200;
    },
    3: function(monto){
        return monto + monto * 0.20 + 500;
    }
}

function calcularImpuestos (categoria, monto){
    console.log(calculos[categoria](monto))
}
// calcularImpuestos(1, 1000);
// calcularImpuestos(2, 1000);
// calcularImpuestos(3, 1000);

//DOM
// document.getElementById('botton').onclick = function(e){
//     alert("Has presionado el boton")
// }

document.getElementById('botton').addEventListener('click', function(e){
    let elementoScript = document.createElement('script');
    elementoScript.src ="script3.js";
    document.body.appendChild(elementoScript)
}) 

//Evento submit del formulario
document.getElementById('formulario').onsubmit = function(evento){
    evento.preventDefault()
    let formValues = new FormData(evento.target)
    console.log(formValues)
}

function agregarInputAlFormulario(){
    let formulario = document.querySelector('#formulario');
    let input = document.createElement("input")
    input.type = "text"
    input.name = "direccion";
    formulario.appendChild(input)
}

function agregarInputUsandoTexto(){
    //ESTO NO ES RECOMENDABLE
    
    let formulario = document.querySelector('#formulario');
    let input = "<input type='text' name='direccion'/>"
    formulario.innerHTML += input;
}

//agregarInputAlFormulario();
agregarInputUsandoTexto();

function solicitudHttpAjax(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText)
        }
    }
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true)
    xhttp.send()
}

function solicitudHttpFetch(){
    let fetchResult = fetch("https://jsonplaceholder.typicode.com/todos/1")
    fetchResult.then(result =>{
        return result.text()
    }).then(datosJson=> {
        console.log(datosJson)
    }).catch(error=>{
        console.error(error)
    })
}

async function solicitudHttpFetchAsyncAwait(){
    try{
        let fetchResult = await fetch("https://jsonplaceholder.typicode.com/todos/1")
        let jsonResult = await fetchResult.json()
        console.log(jsonResult)
    }
    catch(err){
        console.error(err)
    }
}

//solicitudHttpFetch()
solicitudHttpFetchAsyncAwait();
function TemporizadoresSetTimeout(){
  setTimeout(function(){
    solicitudHttpAjax()
  }, 3000)
}
function TemporizadoresSetInterval(){
    let intervalId = setInterval(function(){
      solicitudHttpAjax()
    }, 5000)

    setTimeout(function(){
        clearInterval(intervalId)
    },30000)
}

function storageDelNavegador(){
    //SessionStorage se elimina al cerrar la pestaña
    //LocalStorage es persistente, a menos que se eliminen de forma manual.
    //ADVERTENCIA: No usar para datos sensibles.
    sessionStorage.setItem("miVariable", "miValor");
    console.log(sessionStorage.getItem("miVariable"));

    sessionStorage.miVariable2 = "MIVALOR";
    console.log(sessionStorage.miVariable2)
    console.log(sessionStorage.getItem("cualquiercosa"))

    //localStorage es la misma API
}   
//TemporizadoresSetTimeout()
//TemporizadoresSetInterval()
//solicitudHttpAjax()

storageDelNavegador()