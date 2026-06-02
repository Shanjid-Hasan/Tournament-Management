const express = require("express");

const router = express.Router();

const { getFixtures } = require("../controllers/matchController");

router.get("/:tournamentId", getFixtures);

module.exports = router;
