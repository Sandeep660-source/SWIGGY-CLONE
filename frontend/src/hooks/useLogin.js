import { useState } from "react";
const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const validateSignup = ( email, password) => {
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };
  return { validateLogin, error, setError, loading, setLoading };
};
export default useLogin

