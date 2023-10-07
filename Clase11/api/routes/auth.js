const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")
const bcrypt = require('bcrypt')
const saltRounds = 10;

/* GET users listing. */

router.get("/", (req,res)=>{
  res.send("OK")
})

router.post('/', async (req, res, next)=> {
  
  let {email,pass} = req.body
  let data = {}
  try{
    //Abrimos la conexion
    let connection = await sql.connect(config)
    //ejecutamos la consulta
    
    const resultado = await connection.request()
    .input("email", sql.VarChar, email)
    .execute("dbo.usp_login")

    //const resultado = await sql.query("SELECT pass, status FROM Users WHERE email = @email AND status='A'")

    
    const usuario = resultado.recordset[0]
    if (!usuario){
      res.statusCode = 404
      return res.send("Usuario no existe")
    }
    if (!bcrypt.compareSync(pass, usuario.pass)){
      res.statusCode = 400
      return res.send("Contraseña incorrecta")
    }

    data = usuario.id
    //Todo OK el usuario y contraseña son correctos
    req.session.user_id = data
  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send({id: data})
});



module.exports = router;
