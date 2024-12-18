

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4000;


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://@cluster0.uvojg.mongodb.net/wallet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((e) => {
    console.log('Error connecting to MongoDB', e);
});


const Wallet = require('./models/Wallet');
const Transaction = require('./models/Transaction');


const Users = mongoose.model('Users', {
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    date: { type: Date, default: Date.now },
    balance: { type: Number, default: 0 },
    isverified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
});


app.get("/", (req, res) => {
    res.send("Express app is running!");
});

app.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ success: false, errors: "User with this email already exists" });
    }

    const user = new Users({ username, email, password });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
    res.json({ success: true, token });
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
        if (password === user.password) {
            const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Invalid password" });
        }
    } else {
        res.json({ success: false, errors: "Invalid email" });
    }
});


app.post('/api/wallet', async (req, res) => {
    try {
        const { userId, balance } = req.body;
        const wallet = new Wallet({ userId, balance });
        await wallet.save();
        res.status(201).json(wallet);
    } catch (err) {
        res.status(500).json({ message: 'Error creating wallet', error: err });
    }
});

app.get('/api/wallet/:userId', async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.params.userId });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        res.status(200).json(wallet);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching wallet', error: err });
    }
});


app.post('/api/transaction', async (req, res) => {
    try {
        const { walletId, type, amount, category } = req.body;
        const transaction = new Transaction({ walletId, type, amount, category });
        await transaction.save();

        const wallet = await Wallet.findById(walletId);
        if (type === 'deposit') {
            wallet.balance += amount;
        } else if (type === 'transfer') {
            wallet.balance -= amount;
        }
        await wallet.save();

        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Error creating transaction', error: err });
    }
});

app.get('/api/transactions/:walletId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ walletId: req.params.walletId });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching transactions', error: err });
    }
});


app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.log("Error in server: " + error);
    }
});
