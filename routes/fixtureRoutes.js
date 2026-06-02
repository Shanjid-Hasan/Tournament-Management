const express = require("express");

const router = express.Router();

const { generateFixtures } = require("../controllers/fixtureController");

router.post("/generate/:tournamentId", generateFixtures);

module.exports = router;
