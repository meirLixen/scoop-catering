import axios from "axios";

const apiUrl = process.env.API_URL;

console.log("apiUrl: ", apiUrl); 
const api = axios.create({
   // baseURL: "http://localhost:3002/api",

   baseURL: "https://scoopcatering.co.il/api",


  //  baseURL: "http://5.180.183.130:3001/api",
  withCredentials: true
});
  
export default api;
