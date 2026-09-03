const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("GPS server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.post("/location", (req, res) => {
  res.status(500).json({ status: "error", message: "Server not ready" });
});
