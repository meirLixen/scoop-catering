import axios from "axios";

let apiUrl = process.env.API_URL;
const url = window.location.href
const shortUrl =url.substring(0,url.lastIndexOf('/') + 1);
if (shortUrl === "http://localhost:3001/")
  apiUrl = "http://localhost:3000/api"

else
  apiUrl = "https://scoopcatering.co.il/api"
console.log("apiUrl: ", apiUrl);
const api = axios.create({
  // baseURL: "http://localhost:3002/api",
  // baseURL: "https://scoopcatering.co.il/api",
  baseURL: apiUrl,
  //  baseURL: "http://5.180.183.130:3001/api",
  withCredentials: true
});

export default api;
