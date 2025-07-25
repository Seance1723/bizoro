import axios from "axios";
const BASE = "http://localhost/bizoro_api/modules/product";

export const addProduct = (data) =>
  axios.post(`${BASE}/add.php`, data, {
    headers: { "Content-Type": "application/json" }
  }).then(r => r.data);

export const listProducts = (vendor_id) =>
  axios.get(`${BASE}/list.php` + (vendor_id ? `?vendor_id=${vendor_id}` : "")).then(r => r.data);

export const updateProduct = (data) =>
  axios.put(`${BASE}/update.php`, data, {
    headers: { "Content-Type": "application/json" }
  }).then(r => r.data);

export const deleteProduct = (id, vendor_id) =>
  axios.delete(`${BASE}/delete.php`, {
    data: { id, vendor_id },
    headers: { "Content-Type": "application/json" }
  }).then(r => r.data);

export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axios.post(
    `${BASE}/upload_image.php`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};
