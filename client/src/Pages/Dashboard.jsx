import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/transactions");
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
    <div>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: 12 }}>
        <Link to="/add"><button>Add Transaction</button></Link>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Total balance: </strong>
        <span>{total >= 0 ? `₹${total}` : `- ₹${Math.abs(total)}`}</span>
      </div>

      {loading ? <p>Loading...</p> : (
        <table style={{ width: "100%", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              <th style={{textAlign:"left"}}>Title</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {txns.map(t => (
              <tr key={t._id} style={{ borderTop: "1px solid #eee" }}>
                <td>{t.title}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.category}</td>
                <td>{t.amount >= 0 ? `₹${t.amount}` : `- ₹${Math.abs(t.amount)}`}</td>
                <td>
                  <Link to={`/${t._id}/edit`}><button>Edit</button></Link>
                  <button onClick={() => deleteTxn(t._id)} style={{ marginLeft:8 }}>Delete</button>
                </td>
              </tr>
            ))}
            {txns.length === 0 && (
              <tr><td colSpan={5}>No transactions found. Add one!</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
