import { useEffect, useState } from "react"


export const Dashboard = ({socket})=>{
    const[usuarios, setUsuarios] = useState(0)
    

    useEffect(()=>{
        //El socket ha cambiado
        socket.on("new_user_logged", (data)=>{
            setUsuarios(data.conteo)
        })
        socket.on("user_logout", (data)=>{
            setUsuarios(data.conteo)
        })
        //console.log("El socket ha cambiado")
    },[socket])


    return (
        <>
            <h1> Usuarios conectados {usuarios}</h1>
        </>
    )
}