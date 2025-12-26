const db = require("../models/db");
const { v4: uuid } = require("uuid");

// Generate 6-character pairing code
const generateCode = () => {
  return uuid().slice(0, 6).toUpperCase();
};

// TV registers itself
exports.registerDisplay = (req, res) => {
  const code = generateCode();

  const sql = "INSERT INTO displays (pairing_code) VALUES (?)";
  db.query(sql, [code], (err, result) => {
    if (err) return res.status(500).send(err);

    res.json({
      displayId: result.insertId,
      pairingCode: code
    });
  });
};

// Client pairs with TV using code
exports.pairDisplay = (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Pairing code required" });
  }

  const sql =
    "SELECT * FROM displays WHERE pairing_code = ? AND is_paired = false";

  db.query(sql, [code], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Invalid or already used code" });
    }

    const displayId = results[0].id;

    db.query(
      "UPDATE displays SET is_paired = true WHERE id = ?",
      [displayId],
      () => {
        // 🔥 NOTIFY TV THAT IT IS PAIRED
        req.io.to(code).emit("tv-paired");

        res.json({
          message: "TV paired successfully",
          displayId
        });
      }
    );
  });
};
