const express = require("express");

const router = express.Router();

const {
  generateGroups,
  getGroupsByTournament,
} = require("../controllers/groupController");

router.post("/generate/:tournamentId", generateGroups);


router.get("/:tournamentId", getGroupsByTournament);

module.exports = router;
