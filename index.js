const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (your HTML error pages)
app.use(express.static(path.join(__dirname, "public"))); // Put 404.html, 500.html, etc. in /public

// Example route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Force a 500 error for testing
app.get("/error500", (req, res) => {
  res.status(500).sendFile(path.join(__dirname, "public", "500.html"));
});

// Force a 505 error for testing
app.get("/error505", (req, res) => {
  res.status(505).sendFile(path.join(__dirname, "public", "505.html"));
});

// Catch-all for 404 (must be after all other routes)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Force a 418 error for fun
app.get("/error418", (req, res) => {
  res.status(418).sendFile(path.join(__dirname, "public", "418.html"));
});
