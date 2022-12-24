import axios from "axios";

const api = axios.create({
  baseURL: "https://scoopcatering.co.il/",
});

export default api;
