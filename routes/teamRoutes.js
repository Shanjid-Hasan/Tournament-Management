const express = require("express");

const router = express.Router();

const {
  createTeam
} = require("../controllers/teamController");

router.post("/", createTeam);

module.exports = router;