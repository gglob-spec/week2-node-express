const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. JSON Parsing Middleware
app.use(express.json());

// 2. Bonus: Custom Middleware to Log Requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next();
});

// 3. Serve a Static HTML Page at / 
// (Note: This satisfies "serve a static HTML page at /" while allowing the 
// GET / route to return the string "My Week 2 API!" via code if preferred, 
// but serving a file usually takes precedence. We'll add the fallback API string below.)
app.use(express.static(path.join(__dirname, 'public')));

// GET / -> "My Week 2 API!" (If public/index.html doesn't exist)
app.get('/', (req, res) => {
  res.send('My Week 2 API!');
});

// 4. POST /user -> Accepts {name, email}; responds "Hello, [name]!"
app.post('/user', (req, res) => {
  const { name, email } = req.body;

  // Error handling: 400 for missing data
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email in request body.' });
  }

  res.send(`Hello, ${name}!`);
});

// 5. GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ${userId} profile`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});