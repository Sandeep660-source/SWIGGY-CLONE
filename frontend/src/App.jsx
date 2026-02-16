import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom"
import Login from "./Pages/Login"
import Landingpage from "./Pages/Landingpage"
import Signup from "./Pages/Signup"
import Header from "./Components/Header"
import Restaurant from "./Pages/Restaurant.jsx"
import RestaurantDetails from './Pages/RestaurantDetails.jsx'
import {CartProvider} from './context/CartContext.jsx'
import Orders from "./Pages/Order.jsx";

import Cart from './Pages/Cart.jsx'

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
       
       <Route path="/restaurants" element={<Restaurant/>}/>
       <Route path="/restaurant/:id" element={<RestaurantDetails/>}/>
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/orders" element={<Orders/>}/>

      </Routes>
      
    </>
  )
}

export default App
