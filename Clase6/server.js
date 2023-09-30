const http = require("node:http");

const hostname= "127.0.0.1";
const port = 3000;

let productos = ["azucar", "sal", "sopa"];

const server = http.createServer((req, res) => {
    console.log({
        url: req.url,
        method: req.method
    });

    if (req.method === "GET"){
        res.statusCode = 400;
        res.setHeader("Content-Type", "text-plain");
        res.end("Metodo no permitido")
    }
    if (req.method === "POST"){
        console.log(req)
        res.statusCode = 200;
        res.setHeader("Content-Type", "text-plain");
        res.end("Has enviado datos en metodo post")
    }
    else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Upline\n');
    }
   
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}); 