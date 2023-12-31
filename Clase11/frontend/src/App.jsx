import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Layout} from './Pages/Layout'
import {Users} from './Pages/Users'
import { Teachers } from './Pages/Teachers'
import {Login} from './Pages/Login'
import "./App.css"
function App() {
 
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/Login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index path="/Users" element={<Users />} />
            <Route index path="/Teachers" element={<Teachers />} />
          </Route>
          <Route path="*" 
              element={<>
                <h2>No encontramos la pagina</h2>
              </>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
