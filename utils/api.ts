import axios from "axios";

const API_BASE_URL = "https://ritman-uni-be.onrender.com/api/v1";
const API_KEY = "Rd6IMmXI6o3U9jx3D0bmhZR5QdeKtnrcZ";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

// const storedUser = localStorage.getItem("user");
// if (storedUser) {
//   const user = JSON.parse(storedUser);
//   api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
// }

export default api;
