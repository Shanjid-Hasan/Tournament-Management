const db = require("../config/db");

exports.generateFixtures = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const [groups] = await db.query(
      `
      SELECT *
      FROM groups
      WHERE tournament_id = ?
      `,
      [tournamentId],
    );

    if (!groups.length) {
      return res.status(400).json({
        message: "No groups found",
      });
    }

    let totalMatches = 0;

    for (const group of groups) {
      const [teams] = await db.query(
        `
        SELECT *
        FROM teams
        WHERE group_id = ?
        `,
        [group.id],
      );

      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          await db.query(
            `
            INSERT INTO matches
            (
              tournament_id,
              group_id,
              team1_id,
              team2_id,
              stage
            )
            VALUES (?, ?, ?, ?, 'GROUP')
            `,
            [tournamentId, group.id, teams[i].id, teams[j].id],
          );

          totalMatches++;
        }
      }
    }

    res.json({
      message: "Fixtures Generated Successfully",
      totalMatches,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};
