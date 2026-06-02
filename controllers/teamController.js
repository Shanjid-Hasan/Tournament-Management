const db = require("../config/db");

exports.createTeam = async (req, res) => {
  try {
    const { tournament_id, team_name } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO teams
      (
        tournament_id,
        team_name
      )
      VALUES (?, ?)
      `,
      [tournament_id, team_name],
    );

    res.status(201).json({
      message: "Team Created",
      teamId: result.insertId,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
