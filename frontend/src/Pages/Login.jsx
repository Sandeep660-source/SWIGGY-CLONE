import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";              
import { loginAPI } from "../services/api";  
import useLogin from "../hooks/useLogin"; 
import "./Login.css";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading]=useState(false);
  
  

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
      
      // Validate input fields
      
      try {
        setLoading(true);
        const userData = {  email, password };
        const data = await loginAPI(userData);
        console.log("Login successful:", data);
        if (data.token){
          localStorage.setItem("token",data.token)
        }
  
        alert("Login successful!");
        
        navigate("/restaurants");
      } catch (err) {
        console.error("Error:", err);
        setError(
          err.response?.data?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
  };


  return (
    <div>
        <form id="login-form" onSubmit={handleSubmit}>

            <div>
                <label>Email: </label>

                <input type="text"  value ={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
            </div>
            <div>
                <label>Password: </label>
                <input type="text" value ={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
            </div>
            <div>
                <button type='submit'>Submit</button></div>
                

        </form>
    </div>
  )
}

export default Login
