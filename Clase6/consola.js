os = require('os')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

readline.question("Cual es tu nombre" + os.EOL, (name)=>{
    console.log("Tu nombre es " + name)
})