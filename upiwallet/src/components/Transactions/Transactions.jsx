import React, { useState } from 'react';
import './Transactions.css';
import axios from "axios";
const Transactions = () => {
    const [formType, setFormType] = useState(''); 
    const [balance, setBalance] = useState(0);// 'deposit' or 'transfer'
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        name: '',
        address: '',
        city: '',
        postcode: '',
        email: '',
        country: '',
        cardNumber: ''
    });
    const [transactions, setTransactions] = useState([]); // Stores submitted transactions

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancel = () => {
        setFormType('');
        setFormData({
            amount: '',
            category: '',
            name: '',
            address: '',
            city: '',
            postcode: '',
            email: '',
            country: '',
            cardNumber: ''
        });
    };
  
    
    const handleSubmit = () => {
        const newTransaction = {
            id: `TXN-${new Date().getTime()}`, // Unique transaction ID
            ...formData,
            date: new Date().toLocaleString(),
            type: formType,
            status: 'Success'
        };

        setTransactions([...transactions, newTransaction]);
        handleCancel(); // Reset the form after submission
    };

    return (
        <div className="transactions-container">
            <h1>Transactions</h1>
            <div className="actions">
                <button onClick={() => setFormType('deposit')}>Deposit</button>
                <button onClick={() => setFormType('transfer')}>Transfer</button>
            </div>

            {formType && (
                <div className="transaction-form">
                    <h2>{formType === 'deposit' ? 'Deposit Form' : 'Transfer Form'}</h2>
                    <form >
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                        />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="savings">Savings</option>
                            <option value="food">Food</option>
                            <option value="salary">Salary</option>
                        </select>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="postcode"
                            placeholder="Postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="form-buttons">
                            <button type="button" onClick={handleCancel}>Cancel</button>
                            <button type="button" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            )}

            {transactions.length > 0 && (
                <div className="transactions-table">
                    <h2>Transaction History</h2>
                    <table style={{
              padding: "20px",
              backgroundColor: "rgb(220, 220, 226)",
              border: "1px solid black",
              color: "rgb(5, 5, 126)",
              height: "20vh",
              paddingLeft:"30px",
              width:"100%"
            }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Postcode</th>
                                <th>Email</th>
                                <th>Country</th>
                                <th>Card Number</th>
                                <th>Date & Time</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.name}</td>
                                    <td>{transaction.address}</td>
                                    <td>{transaction.city}</td>
                                    <td>{transaction.postcode}</td>
                                    <td>{transaction.email}</td>
                                    <td>{transaction.country}</td>
                                    <td>{transaction.cardNumber}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Transactions;
