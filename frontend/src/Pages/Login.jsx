import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";              
import { loginAPI } from "../services/api";  
import useLogin from "../hooks/useLogin"; 



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { login } = useUser();

  const navigate = useNavigate();
  const { validateLogin, error, setError, loading, setLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
      
      // Validate input fields
      const isValid = validateLogin(email, password);
       if(!isValid){
        return
       }
      try {
        setLoading(true);
        const userData = {  email, password };
        const data = await loginAPI(userData);
  
        alert("Login successful!");
        navigate("/");
      } catch (err) {
        console.error("Error:", err);
        setError(
          err.response?.data?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
  };
}
    


const Loginpage = () => {

    const [userName, setuserName]=useState('');
    const [password, setPassword]=useState('');

  return (
    <div>
        <form>
            <div>
                <label>Username: </label>
    
                <input type="text"  value ={userName} onChange={(e)=>setuserName(e.target.value)} placeholder='Enter Username'/>
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

export default Loginpage
