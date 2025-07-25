import axios from "axios";
const BASE = "http://localhost/bizoro_api/modules";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(
    `${BASE}/vendor/upload_image.php`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
