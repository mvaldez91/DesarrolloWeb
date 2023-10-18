import { NavLink, Outlet } from "react-router-dom"

export const Layout =()=>{

    return(
        <div className="w3-margin">
        <div class="w3-bar w3-indigo">
            <NavLink  className="w3-bar-item w3-button" to="/Users">
                Usuarios
            </NavLink>
            <NavLink className="w3-bar-item w3-button" to="/Teachers">
                Profesores
            </NavLink>
        </div>
         <Outlet/>
         </div>
    )
}