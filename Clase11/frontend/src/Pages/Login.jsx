import { useState } from 'react'

export const Login = () => {
  const [user, setUser] = useState({
    email: '',
    pass: '',
  })

  
  const valueHasChanged = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const loginClick = async(e)=>{
    e.preventDefault()
  }
  return (
    <main className="w3-cell-row w3-margin-top">
      <div className="w3-container w3-cell"></div>

      <div className="w3-container w3-light-grey w3-cell w3-cell-middle  ">
        <form className="w3-container w3-margin-top w3-margin-bottom "
              onSubmit={loginClick}
        >
            <h4>Ingreso al Sistema UMG</h4>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="text"
            id="email"
            name="email"
            className="w3-input"
            value={user.email}
            onChange={valueHasChanged}
          />
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="pass"
            name="pass"
            className="w3-input"
            value={user.pass}
            onChange={valueHasChanged}
          />
          <button type="submit" className="w3-button w3-blue w3-margin-top" >Ingresar</button>
        </form>
      </div>

      <div className="w3-container  w3-cell w3-cell-bottom"></div>
    </main>
  )
}
