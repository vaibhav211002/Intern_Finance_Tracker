import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import TransactionForm from "../components/TransactionForm";

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/api/transactions`);
        const item = res.data.find(x => x._id === id);
        if (!item) return alert("Transaction not found");
        setInitial({
          title: item.title,
          amount: item.amount,
          date: item.date.slice(0,10),
          category: item.category
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load transaction");
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await api.put(`/api/transactions/${id}`, data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!initial) return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          border: '3px solid #e2e8f0',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }}></div>
        <p style={{
          color: '#64748b',
          fontSize: '16px',
          margin: 0
        }}>Loading transaction...</p>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#64748b',
              fontWeight: '500',
              padding: '8px 0',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#334155';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#64748b';
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
        
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1e293b',
          margin: '0 0 24px 0',
          textAlign: 'left'
        }}>Edit Transaction</h2>

        <TransactionForm initial={initial} onSubmit={handleUpdate} submitLabel="Update" />
      </div>
    </div>
  );
}