
const config = {
    server: "localhost\\SQLSRV",
    user: "sa",
    password:"P@ss1234",
    database: "Alumno",
    options: {
        trustServerCertificate: true
    }
}

module.exports.config = config;