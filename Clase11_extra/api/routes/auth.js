const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")
const bcrypt = require('bcrypt');
const { verifySession } = require('../middlewares/session_auth');
const { send_email } = require('../helpers/send_email');
const { broadcast } = require('../services/sockets');
const saltRounds = 10;


/* GET users listing. */
router.post('/login', async (req, res, next)=> {
  
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
      return res.send({message: "Usuario no existe"})
    }
    if (!bcrypt.compareSync(pass, usuario.pass)){
      res.statusCode = 400
      return res.send({message: "Contraseña incorrecta"})
    }
    //Todo OK el usuario y contraseña son correctos
    //Guardamos datos en la sesion.
    req.session.user_id = usuario.id

    await connection
    .request()
    .input("id", sql.Int, usuario.id)
    .query("UPDATE Users SET connected=1 WHERE id=@id")
    
    const count_result = await sql.query("SELECT count(*) as users_count from users where connected = 1")    
    const conteo = count_result.recordset[0].users_count

    broadcast("new_user_logged", {conteo: conteo})
   
    data = usuario
    send_email(process.env.NOTIFICATION_EMAIL, 'Alguien ha iniciado sesion en la app',
     `
       <h1>Hola</h1>
       <p>El usuario ${usuario.email} ha iniciado sesion
     `
    )
  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send({id: data.id, name: data.name, email: data.email })
});

// router.get('/user_data', verifySession, async (req, res)=> {
//   let data = {}
//   try{
//     //Abrimos la conexion
//     let connection = await sql.connect(config)
//     //ejecutamos la consulta
//     const resultado = await connection.request()
//                         .input("id", sql.Int, req.session.user_id)
//                         .query("SELECT id, name, email, status FROM Users WHERE id = @id")
//     data = resultado.recordset[0]
//   }
//   catch(err){
//     console.error(err)
//     data = err
//     res.statusCode = 500 //Internal server error
//   }
//   res.send(data)
// });



router.post('/logout', async (req, res)=> {
  
  let connection = await sql.connect(config)
  await connection.request()
                .input("id", sql.Int, req.session.user_id)
                .query("UPDATE Users SET connected=0 WHERE id=@id")
  const count_result = await sql.query("SELECT count(*) as users_count from users where connected = 1")    
  const conteo = count_result.recordset[0].users_count

  req.session.user_id = null
  if (global.socket){
    global.socket.broadcast.emit("user_logout", {conteo: conteo})
  }
  res.send(200)
})

module.exports = router;
