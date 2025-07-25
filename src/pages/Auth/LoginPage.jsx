import React, { useState } from "react";
import { loginUser } from "../../api/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    const res = await loginUser(form);
    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.user));
      setMsg("Login successful");
      // Optionally redirect to profile
      // window.location.href = "/profile";
    } else {
      setMsg(res.error || "Login failed");
    }
  };

  return (
    <div>
      <h2>Bizoro Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
