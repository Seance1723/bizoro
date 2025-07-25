import React, { useState } from "react";
import { registerUser } from "../../api/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", role_id: "1" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    const res = await registerUser(form);
    setMsg(res?.error || "Registered! Please login.");
  };

  return (
    <div>
      <h2>Bizoro Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role_id" onChange={handleChange} value={form.role_id}>
          <option value="1">Buyer</option>
          <option value="2">Vendor</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
