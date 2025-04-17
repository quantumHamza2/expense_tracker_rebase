import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
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
