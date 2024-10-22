const express = require("express");
const router = express.Router();
const db = require("../db");

// Add new category
router.post("/", (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `INSERT INTO categories (name, type) VALUES (?, ?)`;
  db.run(query, [name, type], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Get all categories
router.get("/", (req, res) => {
  const query = `SELECT * FROM categories`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
