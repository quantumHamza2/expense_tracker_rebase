import React, { useState } from 'react';

const TransactionForm = ({ addTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: +amount,
      category,
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
    setCategory('General');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
        >
          <option value="General">General</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
      </div>

      <div>
        <label>Transaction</label>
        <input
          type="text"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <label>Amount (negative - expense, positive - income)</label>
        <input
          type="number"
          placeholder="Enter amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
