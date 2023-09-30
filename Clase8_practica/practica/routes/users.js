var express = require('express');
var router = express.Router();
const {dbconfig} = require('../services/db_connection')
const mssql = require('mssql')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let data = [];
  try{
    await mssql.connect(dbconfig)
    const resultados = await mssql.query("Select * from Alumno")
    data = resultados.recordset
    await mssql.close()
  }
  catch(err){
    console.error(err)
  }
  
  res.send(data);
});
router.post("/", async (req, res, next)=>{
  const alumno = req.body;
  let resultado = {}
  try {
    let connection = await mssql.connect(dbconfig)
    const result = await connection
                              .request()
                              .input("id", mssql.Int, alumno.id)
                              .input("nombre", mssql.VarChar, alumno.nombre)
                              .input("telefono", mssql.VarChar, alumno.telefono)
                              .input("direccion", mssql.VarChar, alumno.direccion)
                              .input("carnet", mssql.VarChar, alumno.carnet)
                              .input("edad", mssql.Int, alumno.edad)
                              .query("INSERT INTO Alumno (id,nombre, telefono, direccion,carnet,edad) values (@id, @nombre, @telefono, @direccion,@carnet,@edad)")
    resultado =result.rowsAffected                         
    await mssql.close()
  } catch (error) { 
    resultado = error
    console.error(error)
  }
  res.send(resultado)
})

module.exports = router;
