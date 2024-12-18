
import React, { useState } from 'react';
// import Wallets from './Wallets';  // Assuming Wallets.jsx is in a different folder
import Wallets from '../../../upiwallet/src/components/Wallets/Wallets';
const Admin = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, sender: 'Alice', receiver: 'Bob', amount: 100, date: '2024-12-18', status: 'pending' },
    { id: 2, sender: 'Charlie', receiver: 'David', amount: 200, date: '2024-12-18', status: 'pending' },
  ]);

  const updateTransactionStatus = (id, status) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id ? { ...transaction, status } : transaction
      )
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div id="Transactions">
        <h3>Transactions</h3>
        <Wallets transactions={transactions} updateTransactionStatus={updateTransactionStatus} />
      </div>
    </div>
  );
};

export default Admin;
