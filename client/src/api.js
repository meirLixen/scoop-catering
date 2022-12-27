import axios from "axios";

const api = axios.create({
   //baseURL: "https://scoopcatering.co.il/",
  baseURL: "http://localhost:3001/api",
  
  withCredentials: true,
});

export default api;
