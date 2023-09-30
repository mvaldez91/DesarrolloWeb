const sql = require('mssql')

var config = {
  server: "localhost\\SQLSRV", // or "localhost"
  user: "sa",
  password: "P@ss1234",
  database: "Alumno",
    options: {  
      trustServerCertificate: true     
    }
  
};

module.exports.dbconfig = config;