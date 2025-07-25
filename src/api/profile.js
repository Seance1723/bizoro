// Bizoro Profile API
import axios from "axios";
const BASE = "http://localhost/bizoro_api/modules";

export const fetchProfile = user_id =>
  axios.get(`${BASE}/user/profile.php?user_id=${user_id}`).then(r => r.data);

export const updateProfile = data =>
  axios.put(`${BASE}/user/profile.php`, data).then(r => r.data);
