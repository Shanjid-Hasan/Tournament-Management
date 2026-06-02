const db = require("../config/db");

exports.createTournament = async (req, res) => {
  try {
    const {
      name,
      total_teams,
      overs_per_match,
      group_count,
      qualification_type,
    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO tournaments
      (
        name,
        total_teams,
        overs_per_match,
        group_count,
        qualification_type
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [name, total_teams, overs_per_match, group_count, qualification_type],
    );

    res.status(201).json({
      message: "Tournament Created",
      tournamentId: result.insertId,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;

    const [tournament] = await db.query(
      `
      SELECT *
      FROM tournaments
      WHERE id = ?
      `,
      [id],
    );

    if (!tournament.length) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    res.json(tournament[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};