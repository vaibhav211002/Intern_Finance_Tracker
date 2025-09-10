import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TransactionForm from "../components/TransactionForm";

export default function AddTransaction() {
  const navigate = useNavigate();
  
  const handleCreate = async (data) => {
    try {
      await api.post("/api/transactions", data); // ✅ fixed
      navigate("/"); // better UX: go to dashboard after adding
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: 'rgba(102, 126, 234, 0.1)',
              border: '2px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#667eea',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              marginRight: '16px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(102, 126, 234, 0.2)';
              e.target.style.borderColor = '#667eea';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(102, 126, 234, 0.1)';
              e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
            }}
          >
            ← Back
          </button>
          
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#2d3748',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            flex: 1,
            textAlign: 'center'
          }}>Add Transaction</h2>
        </div>

        <TransactionForm onSubmit={handleCreate} submitLabel="Create" />
      </div>
    </div>
  );
}