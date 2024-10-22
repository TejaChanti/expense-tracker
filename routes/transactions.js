const express = require("express");
const router = express.Router();
const db = require("../db");

// Add a new transaction
router.post("/", (req, res) => {
  const { type, category_id, amount, date, description } = req.body;
  if (!type || !category_id || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
        INSERT INTO transactions (type, category_id, amount, date, description)
        VALUES (?, ?, ?, ?, ?)
    `;
  db.run(query, [type, category_id, amount, date, description], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Get all transactions
router.get("/", (req, res) => {
  const query = `SELECT * FROM transactions`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get transaction by ID
router.get("/:id", (req, res) => {
  const query = `SELECT * FROM transactions WHERE id = ?`;
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(row);
  });
});

// Update transaction by ID
router.put("/:id", (req, res) => {
  const { type, category_id, amount, date, description } = req.body;
  const query = `
        UPDATE transactions
        SET type = ?, category_id = ?, amount = ?, date = ?, description = ?
        WHERE id = ?
    `;
  db.run(
    query,
    [type, category_id, amount, date, description, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete transaction by ID
router.delete("/:id", (req, res) => {
  const query = `DELETE FROM transactions WHERE id = ?`;
  db.run(query, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ deleted: this.changes });
  });
});

// Summary: Total income, total expenses, and balance
router.get("/summary", (req, res) => {
  const query = `
        SELECT 
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses
        FROM transactions
    `;
  db.get(query, [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const balance = row.total_income - row.total_expenses;
    res.json({ ...row, balance });
  });
});

module.exports = router;
