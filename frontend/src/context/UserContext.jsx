import React from 'react'
import { createContext, useContext, useState,useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children } ) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() =>{
    const token = localStorage.getItem("token");
    if(token) {
        try{

        
        const decode = jwtDecode(token);
        if(decode.exp*1000>Date.now())
        {
            setUser({
            id: decode.id,
            email: decode.email
        })}
        else{
            localStorage.removeItem("token");
        }
        }catch (error){
            console/error("Errror decoding token:", error);
            localStorage.removeItem("token");
        }
          }
          setLoading(false);
        },[]);  

    
    const logout=()=>{
    setUser(null);
    localStorage.removeItem("token");
    }
const login=(userData)=>{
    setUser(userData);
}

return (
   <UserContext.Provider value= {{user,login,logout,loading}}>
    {children}
   </UserContext.Provider>
  )

}
export const useUser = () => {
  return useContext(UserContext);
};

    
    
   




  