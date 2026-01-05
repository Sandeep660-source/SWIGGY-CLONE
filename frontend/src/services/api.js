import axios from "axios";
const API_URL = "http://localhost:3000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const signupAPI = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};
export const loginAPI = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}

