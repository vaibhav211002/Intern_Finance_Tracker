import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", user); // ✅ call backend
      localStorage.setItem("ft_token", res.data.token);
      localStorage.setItem("ft_user", res.data.username);
      navigate("/dashboard"); // go to dashboard after signup
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
        <input
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: 12 }}>
        Already have an account?{" "}
        <a href="/">Login</a>
      </p>
    </div>
  );
}
