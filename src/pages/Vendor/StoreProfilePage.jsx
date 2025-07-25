import React, { useEffect, useState } from "react";
import { fetchVendorProfile, updateVendorProfile } from "../../api/vendor";
import { uploadImage } from "../../api/upload";

export default function StoreProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [profile, setProfile] = useState({});
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState({ logo: false, banner: false });

  useEffect(() => {
    if (user.id) {
      fetchVendorProfile(user.id).then(setProfile);
    }
  }, [user.id]);

  const handleChange = e =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  // Handle logo/banner file upload
  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setUploading(u => ({ ...u, [name]: true }));
      const res = await uploadImage(files[0]);
      setUploading(u => ({ ...u, [name]: false }));
      if (res.success) {
        setProfile({ ...profile, [name]: res.url });
      } else {
        alert(res.error || "Upload failed");
      }
    }
  };

  const handleSave = async e => {
    e.preventDefault();
    const res = await updateVendorProfile({ user_id: user.id, ...profile });
    setMsg(res.success ? "Store profile updated!" : res.error);
  };

  if (!user.id || user.role_id != 2)
    return <div>Access Denied. Vendors only.</div>;

  return (
    <div>
      <h2>Bizoro Vendor Store Profile</h2>
      <form onSubmit={handleSave}>
        <input
          name="vendor_company_name"
          value={profile.vendor_company_name || ""}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <input
          name="full_name"
          value={profile.full_name || ""}
          onChange={handleChange}
          placeholder="Owner/Contact Name"
        />
        <input
          name="phone"
          value={profile.phone || ""}
          onChange={handleChange}
          placeholder="Contact Phone"
        />
        <input
          name="address"
          value={profile.address || ""}
          onChange={handleChange}
          placeholder="Company Address"
        />

        {/* Logo upload */}
        <div>
          <label>Logo: </label>
          {profile.avatar && <img src={profile.avatar} alt="Logo" style={{ height: 40 }} />}
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
          {uploading.logo && <span>Uploading...</span>}
        </div>

        {/* Banner upload */}
        <div>
          <label>Banner: </label>
          {profile.banner && <img src={profile.banner} alt="Banner" style={{ height: 40 }} />}
          <input
            type="file"
            name="banner"
            accept="image/*"
            onChange={handleFileChange}
          />
          {uploading.banner && <span>Uploading...</span>}
        </div>

        <select
          name="kyc_status"
          value={profile.kyc_status || "pending"}
          onChange={handleChange}
        >
          <option value="pending">KYC Pending</option>
          <option value="verified">KYC Verified</option>
          <option value="rejected">KYC Rejected</option>
        </select>
        <button type="submit">Save</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
