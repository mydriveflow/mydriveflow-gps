// Import Express
const express = require('express');
const app = express();

// Enable JSON body parsing so Base can read GPS data
app.use(express.json());

// Use Render’s dynamic port or fallback to 3000
const PORT = process.env.PORT || 3000;

// Root route for quick test
app.get('/', (req, res) => {
  res.send('Hello, GPS server running on port ' + PORT);
});

// GPS endpoint for Base44
app.post('/location', (req, res) => {
  console.log('GPS:', req.body); // Logs incoming GPS data
  res.json({ status: 'ok' });    // Sends success response to Base
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
