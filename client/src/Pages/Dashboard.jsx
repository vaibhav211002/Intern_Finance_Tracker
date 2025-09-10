import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/transactions");
      setTxns(res.data.sort((a,b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch transactions. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const deleteTxn = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/api/transactions/${id}`);
      setTxns(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const total = txns.reduce((s, t) => s + Number(t.amount), 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '32px',
          fontWeight: '700',
          color: '#2d3748',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Dashboard</h2>

        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <Link to="/add" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #48bb78, #38a169)',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 4px 15px rgba(72, 187, 120, 0.4)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(72, 187, 120, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(72, 187, 120, 0.4)';
            }}>
              Add Transaction
            </button>
          </Link>
        </div>

        <div style={{
          marginBottom: 32,
          padding: '24px',
          background: total >= 0 
            ? 'linear-gradient(135deg, rgba(72, 187, 120, 0.1), rgba(56, 161, 105, 0.1))'
            : 'linear-gradient(135deg, rgba(245, 101, 101, 0.1), rgba(229, 62, 62, 0.1))',
          borderRadius: '16px',
          border: `2px solid ${total >= 0 ? '#48bb78' : '#f56565'}`,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            color: '#4a5568',
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            Total Balance
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: total >= 0 ? '#38a169' : '#e53e3e'
          }}>
            {total >= 0 ? `₹${total}` : `- ₹${Math.abs(total)}`}
          </div>
        </div>

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            fontSize: '18px',
            color: '#667eea'
          }}>
            Loading...
          </div>
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse"
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)'
                }}>
                  <th style={{
                    textAlign: "left",
                    padding: '16px 20px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Title</th>
                  <th style={{
                    padding: '16px 20px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Date</th>
                  <th style={{
                    padding: '16px 20px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Category</th>
                  <th style={{
                    padding: '16px 20px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Amount</th>
                  <th style={{
                    padding: '16px 20px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {txns.map((t, index) => (
                  <tr key={t._id} style={{
                    borderTop: "1px solid #e2e8f0",
                    backgroundColor: index % 2 === 0 ? '#f8fafc' : '#fff',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#edf2f7';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8fafc' : '#fff';
                  }}>
                    <td style={{
                      padding: '16px 20px',
                      fontSize: '16px',
                      color: '#2d3748',
                      fontWeight: '500'
                    }}>{t.title}</td>
                    <td style={{
                      padding: '16px 20px',
                      fontSize: '14px',
                      color: '#4a5568',
                      textAlign: 'center'
                    }}>{new Date(t.date).toLocaleDateString()}</td>
                    <td style={{
                      padding: '16px 20px',
                      fontSize: '14px',
                      color: '#4a5568',
                      textAlign: 'center'
                    }}>{t.category}</td>
                    <td style={{
                      padding: '16px 20px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: t.amount >= 0 ? '#38a169' : '#e53e3e',
                      textAlign: 'center'
                    }}>{t.amount >= 0 ? `₹${t.amount}` : `- ₹${Math.abs(t.amount)}`}</td>
                    <td style={{
                      padding: '16px 20px',
                      textAlign: 'center'
                    }}>
                      <Link to={`/${t._id}/edit`} style={{ textDecoration: 'none' }}>
                        <button style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          marginRight: '8px'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 8px rgba(66, 153, 225, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}>
                          Edit
                        </button>
                      </Link>
                      <button 
                        onClick={() => deleteTxn(t._id)} 
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #f56565, #e53e3e)',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 8px rgba(245, 101, 101, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {txns.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{
                      padding: '40px 20px',
                      textAlign: 'center',
                      fontSize: '18px',
                      color: '#a0aec0',
                      fontStyle: 'italic'
                    }}>
                      No transactions found. Add one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}