const http = require("node:http");
const fs = require('node:fs')
const formidable = require('formidable')

const hostname= "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    console.log({
        url: req.url,
        method: req.method
    });

    if (req.method === "GET" && 
        req.url == "/formulario"){
        res.statusCode = 200;
        const datosArchivo = fs.readFileSync("formulario.html")
        res.setHeader("Content-Type", "text-plain");
        res.write(datosArchivo)
        res.end()
    }
    if (req.method === "POST" &&
        req.url === "/subir"){
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            if(err){
                console.error(err)
                return
            }
            console.log(files.file[0])
            let oldPath = files.file[0].filepath;
            let newpath = "C:/temp/" +  files.file[0].originalFilename;
            fs.renameSync(oldPath, newpath)
            res.write("Archivo subido")
            res.end()
        })
    }
   
   
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}); 