// src/components/TransactionList.js

import React from "react";

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className={transaction.amount < 0 ? "minus" : "plus"}>
            <div className="transaction-info">
              <div className="text">{transaction.text}</div>
              <div className="category">{transaction.category}</div>
            </div>
            <div className="amount-delete">
              <span>₹{Math.abs(transaction.amount)}</span>
              <button onClick={() => deleteTransaction(transaction.id)}>✖️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;

