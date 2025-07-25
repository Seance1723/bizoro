import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../../api/profile";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [profile, setProfile] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user.id) {
      fetchProfile(user.id).then(setProfile);
    }
  }, [user.id]);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleSave = async e => {
    e.preventDefault();
    const res = await updateProfile({ user_id: user.id, ...profile });
    setMsg(res.success ? "Profile updated!" : res.error);
  };

  if (!user.id) return <div>Please log in to view your profile.</div>;

  return (
    <div>
      <h2>Bizoro Profile</h2>
      <form onSubmit={handleSave}>
        <input name="full_name" value={profile.full_name || ""} onChange={handleChange} placeholder="Full Name" />
        <input name="phone" value={profile.phone || ""} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={profile.address || ""} onChange={handleChange} placeholder="Address" />
        {/* Show for vendors only */}
        {user.role_id == 2 && (
          <input
            name="vendor_company_name"
            value={profile.vendor_company_name || ""}
            onChange={handleChange}
            placeholder="Company Name"
          />
        )}
        <button type="submit">Save</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
