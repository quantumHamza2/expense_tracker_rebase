import React from "react";

const Balance = ({ transactions }) => {
  // Extract amounts from transactions
  const amounts = transactions.map(transaction => transaction.amount);

  // Calculate total balance
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  // Calculate income
  const income = amounts.filter(item => item > 0)
                        .reduce((acc, item) => acc + item, 0)
                        .toFixed(2);

  // Calculate expenses
  const expense = (
    amounts.filter(item => item < 0)
           .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  return (
    <div>
      <h2>Your Balance</h2>
      <h3>${total}</h3>
      <div>
        <p>Income: +${income}</p>
        <p>Expenses: -${expense}</p>
      </div>
    </div>
  );
};

export default Balance;
