const db = require("../config/db");

exports.getFixtures = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const [matches] = await db.query(
      `
      SELECT
      m.id,
      m.stage,
      m.match_status,

      t1.team_name AS team1,
      t2.team_name AS team2,

      g.group_name

      FROM matches m

      LEFT JOIN teams t1
      ON m.team1_id = t1.id

      LEFT JOIN teams t2
      ON m.team2_id = t2.id

      LEFT JOIN groups g
      ON m.group_id = g.id

      WHERE m.tournament_id = ?

      ORDER BY m.id
      `,
      [tournamentId],
    );

    res.json(matches);
  } catch (error) {
    res.status(500).json(error);
  }
};
