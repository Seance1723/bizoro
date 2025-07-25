import axios from "axios";
const BASE = "http://localhost/bizoro_api/modules";

export const fetchVendorProfile = user_id =>
  axios.get(`${BASE}/vendor/profile.php?user_id=${user_id}`).then(r => r.data);

export const updateVendorProfile = data =>
  axios.put(`${BASE}/vendor/profile.php`, data, {
    headers: { "Content-Type": "application/json" }
  }).then(r => r.data);
