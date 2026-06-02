function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const db = require("../config/db");

exports.generateGroups = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const [tournament] = await db.query(
      "SELECT * FROM tournaments WHERE id = ?",
      [tournamentId],
    );

    if (!tournament.length) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    const totalGroups = tournament[0].group_count;

    const [teams] = await db.query(
      "SELECT * FROM teams WHERE tournament_id = ?",
      [tournamentId],
    );

    if (!teams.length) {
      return res.status(400).json({
        message: "No teams found",
      });
    }

    const shuffledTeams = shuffleArray([...teams]);

    const groupIds = [];

    for (let i = 0; i < totalGroups; i++) {
      const groupName = `Group ${String.fromCharCode(65 + i)}`;

      const [groupResult] = await db.query(
        `
        INSERT INTO groups
        (tournament_id, group_name)
        VALUES (?, ?)
        `,
        [tournamentId, groupName],
      );

      groupIds.push(groupResult.insertId);
    }

    for (let i = 0; i < shuffledTeams.length; i++) {
      const groupId = groupIds[i % totalGroups];

      await db.query(
        `
        UPDATE teams
        SET group_id = ?
        WHERE id = ?
        `,
        [groupId, shuffledTeams[i].id],
      );
    }

    res.json({
      message: "Groups generated successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGroupsByTournament = async (req, res) => {
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

    const result = [];

    for (const group of groups) {
      const [teams] = await db.query(
        `
        SELECT
        id,
        team_name
        FROM teams
        WHERE group_id = ?
        `,
        [group.id],
      );

      result.push({
        group_id: group.id,
        group_name: group.group_name,
        teams,
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};