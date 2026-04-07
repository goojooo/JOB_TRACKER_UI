import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-eqao.onrender.com/api"
});

export default API;