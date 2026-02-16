import axios from "axios";
const API_URL = "http://localhost:3000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const signupAPI = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};
export const loginAPI = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}
export const getAllRestaurants = async()=>{
  const response = await api.get("/restaurants");
  return response.data.restaurants;
}

export const getRestaurantById = async(id)=>{
  console.log(id);
  const response = await api.get(`/restaurants/${id}`);
  return response.data.restaurant;

}


export const getMenuItemsByRestaurantIdAPI = async(restaurantid)=>{
  const response = await api.get(`menuitem/restaurant/${restaurantid}`);
  return response .data.menuItems;

}
export const createOrderAPI = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getOrderByUserIdAPI = async ()=>{
  const response = await api.get("/orders")
  return response.data;
}