import { NavLink, Outlet } from "react-router-dom"
import { API_ENDPOINT } from "../config/consts"

export const Layout =()=>{

    const logout = async (e)=>{
        e.preventDefault()
        let fetchResp = await fetch(API_ENDPOINT + "/auth/logout", {
            method: "POST",
            credentials: "include"})
        window.location = "/Login"
    }

    return(
        <div className="w3-margin">
        <div class="w3-bar w3-indigo">
            <NavLink className="w3-bar-item w3-button" to="/Dashboard">
                Dashboard
            </NavLink>
            <NavLink  className="w3-bar-item w3-button" to="/Users">
                Usuarios
            </NavLink>
            <NavLink className="w3-bar-item w3-button" to="/Teachers">
                Profesores
            </NavLink>
            <NavLink className="w3-bar-item w3-button" to="/" onClick={logout}>
                Cerrar sesion
            </NavLink>
        </div>
         <Outlet/>
         </div>
    )
}