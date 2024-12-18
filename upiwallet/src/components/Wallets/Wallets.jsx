import React, { useState, useEffect } from 'react';
import "./Wallets.css"
const Wallets = ({ transactions, updateTransactionStatus}) => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionList, setTransactionList] = useState(transactions || []); // Initialize as empty array if transactions is undefined
  const handleStatusChange = (id, status) => {
    updateTransactionStatus(id, status);
  };
  

  useEffect(() => {
    setTransactionList(transactions || []); // Sync the transaction list when the prop changes
  }, [transactions]);

  const handleSendTransaction = () => {
    const transaction = {
      id: new Date().getTime(),
      sender,
      receiver,
      amount,
      date: new Date().toLocaleString(),
      status: 'pending',
    };
    setTransactionList([...transactionList, transaction]);
    setSender('');
    setReceiver('');
    setAmount('');
  };

  return (
    <div className='wallet'>
      <h2>Wallet</h2>
      <div>
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="Sender"
        />
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Receiver"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={handleSendTransaction}>Send</button>
      </div>

      <div id='Transactions'>
        <h3>Transactions:</h3>
        {transactionList.map((transaction) => (
          <div key={transaction.id}>
            <p style={{
              padding: "20px",
              backgroundColor: "rgb(220, 220, 226)",
              border: "1px solid black",
              color: "rgb(5, 5, 126)",
              height: "20vh",
              paddingLeft:"30px",
              width:"100%"}}>
              ID: {transaction.id}, Sender: {transaction.sender}, Receiver: {transaction.receiver}, Amount: {transaction.amount}, Date: {transaction.date}, Status: {transaction.status}
            </p>
            <button onClick={() => handleStatusChange(transaction.id, 'active')}>Active</button>
            <button onClick={() => handleStatusChange(transaction.id, 'inactive')}>Deactive</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallets;
