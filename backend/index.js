const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000; // Backend will run on port 5000

app.use(cors()); // Enable Cross-Origin Requests
app.use(bodyParser.json()); // Parse JSON bodies

// Sample route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Chama App!" });
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
