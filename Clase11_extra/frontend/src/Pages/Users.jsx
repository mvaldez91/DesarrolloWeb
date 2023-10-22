import { useEffect, useState, useRef } from 'react'
import { API_ENDPOINT } from '../config/consts'


export const Users = ({socket}) => {

  const [users, setUsers] = useState([])
  const dialogRef = useRef(null)
  const dialogDeleteRef = useRef(null)
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    email: '',
    name: '',
    pass: '',
  })

  const getAll =async ()=>{
    let fetchResp = await fetch(API_ENDPOINT + "/users", {
        credentials: "include",
    })
    let dataJson = await fetchResp.json()
    setUsers(dataJson)
  }
  useEffect(() => {
    //useEffect vacio, significa que lo va ejecutar cuando se cargue el componente en memoria.
    ;(async () => {
        await getAll()
    })()
  }, [])

  const newUserClick = (e) => {
    e.preventDefault()
    dialogRef.current.showModal()
  }

  const closeNewUserModal = (e) => {
    e.preventDefault()
    dialogRef.current.close()
  }

  const valueHasChanged = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    })
  }

  const formSubmit = async (e) =>{
    e.preventDefault()
    if (currentUser.id <= 0){
      //Create
      await postData(currentUser)
    }
    else{
      await updateData(currentUser)
    }
    setCurrentUser({
      id: 0,
      email: '',
      name: '',
      pass: '',
    })
    dialogRef.current.close()
  }

  const postData = async (data)=>{
    let fetchResp = await fetch(API_ENDPOINT + "/users", {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      let json = await fetchResp.json()
      await getAll()
  }


  const updateData = async (data)=>{
    let fetchResp = await fetch(API_ENDPOINT + "/users/" + data.id, {
      method: "PUT",
      credentials: "include",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      let json = await fetchResp.json()
      await getAll()
  }

  const deleteRow = async (row)=>{
    setCurrentUser(row)
    dialogDeleteRef.current.showModal()
  }

  const deleteData = async (row) =>{
    let fetchResp = await fetch(API_ENDPOINT + "/users/" + row.id, {
      method: "DELETE",
      credentials: "include",
      headers: {
          "Content-Type": "application/json"
      }
      })
      let json = await fetchResp.json()
      await getAll()
  }

  const confirmDelete = async(e)=>{
    e.preventDefault();
    await deleteData(currentUser)
    dialogDeleteRef.current.close()
  }

  const showEdit = (row)=>{
    setCurrentUser(row)
    dialogRef.current.showModal()
  }

  useEffect(()=>{
    socket.on("user_has_been_created", async (user)=>{
      await getAll()
    })
    console.log("Socket activo en users.jsx")
  },[socket])
  return (
    <>
      <dialog ref={dialogRef}>
        <h4>Nuevo usuario</h4>
        <form onSubmit={formSubmit} className="w3-container">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w3-input"
            value={currentUser.name}
            onChange={valueHasChanged}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="w3-input"
            value={currentUser.email}
            onChange={valueHasChanged}
          />
          <label htmlFor="pass">Contrasenia</label>
          <input
            type="password"
            id="pass"
            name="pass"
            className="w3-input"
            value={currentUser.pass}
            onChange={valueHasChanged}
          />
          <label htmlFor='status'>Estado</label>
          <select
           className='w3-select'
           name="status"
           id="status"
           value={currentUser.status}
           onChange={valueHasChanged}
          >
            <option>Seleccione</option>
            <option value="I">Inactivo</option>
            <option value="A">Activo</option>
          </select>
          <div className="w3-row">
            <div className="w3-col m4">
              <button type="submit" className="w3-button w3-green">Guardar</button>         
            </div>
            <div className="w3-col m4">
              <button className="w3-button w3-red" onClick={closeNewUserModal}>Cerrar</button>
            </div>
          </div>
        </form>
      </dialog>
      <button className='w3-button w3-green w3-margin-top' onClick={newUserClick} >Nuevo usuario</button>
      <h1>Usuarios</h1>
      <table className="w3-table w3-striped w3-bordered w3-border">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Contraseña</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={'user' + row.id} style={{backgroundColor: row.status === "I" ? "olive": ""}}>
              <td>{row.id}</td>
              <td>{row.email}</td>
              <td>{row.name}</td>
              <td>{row.pass}</td>
              <td>{row.status}</td>
              <td>
                <button className="w3-button w3-yellow" onClick={(e)=> { showEdit(row) }}>Editar</button>
                <button className="w3-button w3-red" onClick={(e)=> {deleteRow(row)}}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={dialogDeleteRef}>
        <h4>Confirmación de borrado</h4>
        <form onSubmit={confirmDelete} className="w3-container">
           
            Esta seguro que desea eliminar a {currentUser.name}
            <div className='w3-row'>
              <div className='w3-col m6'>
                <button className="w3-button w3-red" type="submit">Confirmar</button>
              </div>
              <div className='w3-col m6'>
                  <button className="w3-button w3-blue" onClick={(e)=>{
                  e.preventDefault()
                  dialogDeleteRef.current.close()
                }} >Cancelar</button>
              </div>
            </div>
        </form>
      </dialog>
    </>
  )
}
