import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Layout} from './Pages/Layout'
import {Users} from './Pages/Users'
import { Teachers } from './Pages/Teachers'
import {Login} from './Pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import { Dashboard } from './Pages/Dashboard'

import socketIO from 'socket.io-client'
import { API_ENDPOINT } from "./config/consts"
const socket = socketIO.connect(API_ENDPOINT)

function App() {
 
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/Login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index path="/Users" element={<Users socket={socket} />} />
            <Route index path="/Teachers" element={<Teachers />} />
            <Route index path="/Dashboard" element={<Dashboard socket={socket} />} />
          </Route>
          <Route path="*" 
              element={<>
                <h2>No encontramos la pagina</h2>
              </>} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
