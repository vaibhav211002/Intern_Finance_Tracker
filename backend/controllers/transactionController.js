import Transaction from "../models/Transaction.js";

// @GET /api/transactions
export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
  res.json(transactions);
};

// @POST /api/transactions
export const createTransaction = async (req, res) => {
  const { title, amount, date, category } = req.body;
  const transaction = await Transaction.create({
    user: req.user._id,
    title,
    amount,
    date,
    category
  });
  res.status(201).json(transaction);
};

// @PUT /api/transactions/:id
export const updateTransaction = async (req, res) => {
  const txn = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
  if (!txn) return res.status(404).json({ message: "Transaction not found" });

  Object.assign(txn, req.body);
  const updated = await txn.save();
  res.json(updated);
};

// @DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  const txn = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!txn) return res.status(404).json({ message: "Transaction not found" });
  res.json({ message: "Transaction deleted" });
};
