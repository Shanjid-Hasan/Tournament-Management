const express = require("express");

const router = express.Router();

const {
  createTournament,
  getTournamentById,
} = require("../controllers/tourController");

router.post("/", createTournament);

router.get("/:id", getTournamentById);

module.exports = router;