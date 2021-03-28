import axios from "axios";

let api = axios.create({
  baseURL: "https://dev-api.alldaydr.com/api/users",
});

export default api;
