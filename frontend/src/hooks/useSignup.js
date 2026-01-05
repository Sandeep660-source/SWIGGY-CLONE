import { useState } from "react";
const useSignup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const validateSignup = (name, email, phone, password) => {
    setError("");
    if (!name || !email || !phone || !password) {
      setError("All fields are required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };
  return { validateSignup, error, setError, loading, setLoading };
};
export default useSignup










