import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TransactionForm from "../components/TransactionForm";

export default function AddTransaction() {
  const navigate = useNavigate();

 const handleCreate = async (data) => {
    try {
      await api.post("/transactions", data); // ✅ fixed
      navigate("/dashboard"); // better UX: go to dashboard after adding
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <TransactionForm onSubmit={handleCreate} submitLabel="Create" />
    </div>
  );
}
