const express = require("express");
const router = express.Router();

const {
  registerDisplay,
  pairDisplay
} = require("../controllers/displayController");

// TV generates pairing code
router.post("/register", registerDisplay);

// Client enters pairing code
router.post("/pair", pairDisplay);

module.exports = router;
