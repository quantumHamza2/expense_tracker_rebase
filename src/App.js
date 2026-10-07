import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("expense-tracker-v1") || "[]");
      return Array.isArray(saved) ? saved.filter(tx => tx && (typeof tx.id === "string" || typeof tx.id === "number") && typeof tx.text === "string" && Number.isFinite(tx.amount) && tx.amount !== 0) : [];
    } catch { return []; }
  });

  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    try { localStorage.setItem("expense-tracker-v1", JSON.stringify(transactions)); setStorageError(""); }
    catch { setStorageError("Changes could not be saved in this browser. Keep this tab open to retain them."); }
  }, [transactions]);

  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions(current => [transaction, ...current]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(current => current.filter(transaction => transaction.id !== id));
};


  // Calculate balance
  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  // Income and Expense
  const income = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className="container">
      <h2>💸 Expense Tracker</h2>
      {storageError && <p role="alert">{storageError}</p>}
      <h3>Your Balance: ₹{balance.toFixed(2)}</h3>

      <div className="income-expense">
        <div>
          <h4>Income</h4>
          <p className="income">₹{income.toFixed(2)}</p>
        </div>
        <div>
          <h4>Expenses</h4>
          <p className="expense">₹{Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>

      <TransactionForm addTransaction={addTransaction} />
      
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />

    </div>
  );
}

export default App;
