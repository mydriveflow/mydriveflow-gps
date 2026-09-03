const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("GPS server running");
});

app.get('/', (req, res) => {
  res.send('Hello, server running on port ' + PORT);
});

// GPS endpoint
app.post('/location', (req, res) => {
  console.log('GPS:', req.body);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
