import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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
