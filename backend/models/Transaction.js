const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    type: { type: String, enum: ['deposit', 'transfer'], required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' },
    date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
