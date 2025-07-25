import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import StoreProfilePage from "./pages/Vendor/StoreProfilePage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/vendor/store" element={<StoreProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
