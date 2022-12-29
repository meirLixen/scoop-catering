import axios from "axios";

const api = axios.create({
   // baseURL: "http://localhost:3002/api",
   baseURL: "https://scoopcatering.co.il",
  withCredentials: true
});

export default api;
