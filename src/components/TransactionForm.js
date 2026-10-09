import React, { useState } from 'react';

const TransactionForm = ({ addTransaction }) => {
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = Number(amount);
    if (!text.trim() || !Number.isFinite(parsed) || parsed === 0 || !Number.isSafeInteger(Math.round(parsed * 100))) {
      setError('Enter a description and a non-zero amount with up to two decimal places.');
      return;
    }
    setError('');

    const newTransaction = {
      id: crypto.randomUUID(),
      text: text.trim(),
      amount: Math.round(parsed * 100) / 100,
      category,
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
    setCategory('General');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p role="alert">{error}</p>}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="category">Category</label>
        <select id="category"
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
        <label htmlFor="description">Transaction</label>
        <input
          id="description"
          required
          type="text"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="amount">Amount (negative - expense, positive - income)</label>
        <input
          id="amount"
          required
          step="0.01"
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
