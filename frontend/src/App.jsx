import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom"
import Login from "./Pages/Login"
import Landingpage from "./Pages/Landingpage"
import Signup from "./Pages/Signup"
import Header from "./Components/Header"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
      <Routes>
        <Route path = "/" element={<Landingpage/>}/>
        <Route path = "/login" element={<Login/>}/>
       <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
