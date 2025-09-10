import React, { useState } from "react";

export default function TransactionForm({ initial = { title:"", amount:0, date:"", category:"" }, onSubmit, submitLabel="Save" }) {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "amount" ? Number(value) : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.category) {
      alert("Please fill title, date and category.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} style={{ display:"grid", gap:10, maxWidth:600 }}>
      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} />
      </label>

      <label>
        Amount (use negative for expense, positive for income)
        <input name="amount" type="number" value={form.amount} onChange={handleChange} />
      </label>

      <label>
        Date
        <input name="date" type="date" value={form.date} onChange={handleChange} />
      </label>

      <label>
        Category
        <input name="category" value={form.category} onChange={handleChange} />
      </label>

      <div>
        <button type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
