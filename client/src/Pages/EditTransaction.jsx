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
        const res = await api.get(`/transactions`);
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
      await api.put(`/transactions/${id}`, data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!initial) return <p>Loading transaction...</p>;

  return (
    <div>
      <h2>Edit Transaction</h2>
      <TransactionForm initial={initial} onSubmit={handleUpdate} submitLabel="Update" />
    </div>
  );
}
