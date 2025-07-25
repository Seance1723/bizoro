// Bizoro Auth API
import axios from "axios";
const BASE = "http://localhost/bizoro_api/modules";

export const registerUser = data =>
  axios.post(`${BASE}/auth/register.php`, data).then(r => r.data);

export const loginUser = data =>
  axios.post(`${BASE}/auth/login.php`, data).then(r => r.data);
