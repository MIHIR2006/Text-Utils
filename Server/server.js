const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Set up CORS options
const corsOptions = {
    origin: ['http://localhost:3000', 'https://mihir2006.github.io/my-app/'], // Allow both local and production origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true // Allow cookies if needed (optional)
}

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for the frontend (React) using the corsOptions
app.use(cors(corsOptions));

// MySQL Database Connection
const db = mysql.createConnection({
    host: '127.0.0.1',           // MySQL Host (127.0.0.1 is the same as localhost)
    port: 3306,                  // Default MySQL port
    user: 'root',                // MySQL Username (root)
    password: '2006',            // MySQL Password (replace with your MySQL password)
  database: 'student', // Replace with your database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// CRUD Routes

// Create
app.post('/create', (req, res) => {
  const { name, age } = req.body;
  const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
  db.query(sql, [name, age], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error inserting data', err });
    res.json({ message: 'Record created', id: result.insertId });
  });
});

// Read
app.get('/read', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching data', err });
    res.json(result);
  });
});

// Update
app.put('/update', (req, res) => {
  const { id, name, age } = req.body;
  const sql = 'UPDATE users SET name = ?, age = ? WHERE id = ?';
  db.query(sql, [name, age, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating data', err });
    res.json({ message: 'Record updated' });
  });
});

// Delete
app.delete('/delete', (req, res) => {
  const { id } = req.body;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting data', err });
    res.json({ message: 'Record deleted' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
