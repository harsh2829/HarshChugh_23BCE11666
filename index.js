const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/LibraryDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB Connection Error:', err));


// User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'users');

// Book Schema and Model
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    genre: String,
    available: Boolean,
});

const Book = mongoose.model('Book', bookSchema, 'books');

// User Endpoints
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials.' });
        }
        res.status(200).json({ message: 'Login successful.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.', error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, password },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully.', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user.', error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.', deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user.', error: error.message });
    }
});

// Book Endpoints
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books.', error: err.message });
    }
});

app.post('/books', async (req, res) => {
    const { title, author, year, genre, available } = req.body;

    try {
        const newBook = new Book({ title, author, year, genre, available });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully.', newBook });
    } catch (err) {
        res.status(500).json({ message: 'Error adding book.', error: err.message });
    }
});

app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, year, genre, available } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, year, genre, available },
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        res.status(200).json({ message: 'Book updated successfully.', updatedBook });
    } catch (err) {
        res.status(500).json({ message: 'Error updating book.', error: err.message });
    }
});

app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        res.status(200).json({ message: 'Book deleted successfully.', deletedBook });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book.', error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
