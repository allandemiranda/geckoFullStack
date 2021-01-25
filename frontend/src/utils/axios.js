import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  responseType: "json",
  crossDomain: true,
});

export default instance;
