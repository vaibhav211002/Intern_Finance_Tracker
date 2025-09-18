import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

export default function Login() {
  console.log(api);
  
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", user); // ✅ call backend
      localStorage.setItem("ft_token", res.data.token);
      localStorage.setItem("ft_user", res.data.username);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        minWidth: '400px'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '28px',
          fontWeight: '700',
          color: '#2d3748',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Login</h2>
        
        <form onSubmit={submit} style={{ 
          display: "grid", 
          gap: 20, 
          maxWidth: 360,
          margin: '0 auto'
        }}>
          <input
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              outline: 'none',
              backgroundColor: '#fff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          <input
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              outline: 'none',
              backgroundColor: '#fff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          <button 
            type="submit"
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(1px)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
          >
            Login
          </button>
        </form>
        
        <p style={{ 
          marginTop: 24, 
          textAlign: 'center',
          color: '#64748b',
          fontSize: '14px'
        }}>
          Don't have an account?{" "}
          <Link 
            to="/register"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#764ba2';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#667eea';
            }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}