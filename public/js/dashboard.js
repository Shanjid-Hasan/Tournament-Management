const tournamentId = localStorage.getItem("tournamentId");

if (!tournamentId) {
  window.location.href = "/";
}

async function loadTournament() {
  const response = await fetch(`/api/tournaments/${tournamentId}`);

  const tournament = await response.json();

  document.getElementById("header").innerHTML = `
        <h1>${tournament.name}</h1>

        <p>
            Teams:
            ${tournament.total_teams}
        </p>

        <p>
            Overs:
            ${tournament.overs_per_match}
        </p>
        <p>Groups: ${tournament.group_count}</p>
    `;
}

async function loadTeams() {
  const response = await fetch(`/api/teams/${tournamentId}`);

  const teams = await response.json();

  let html = "<h3>Registered Teams</h3>";

  teams.forEach((team) => {
    html += `
            <div>
                ${team.team_name}
            </div>
        `;
  });

  document.getElementById("teamsList").innerHTML = html;
}

async function addTeam() {
  const teamName = document.getElementById("teamName").value;

  if (!teamName) {
    alert("Enter Team Name");
    return;
  }

  await fetch("/api/teams", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      tournament_id: tournamentId,

      team_name: teamName,
    }),
  });

  document.getElementById("teamName").value = "";

  loadTeams();
}

async function generateGroups() {
  await fetch(`/api/groups/generate/${tournamentId}`, {
    method: "POST",
  });

  alert("Groups Generated");

  loadGroups();
}

async function loadGroups() {
  const response = await fetch(`/api/groups/${tournamentId}`);

  const groups = await response.json();

  let html = "";

  groups.forEach((group) => {
    html += `
            <div style="
                border:1px solid #ccc;
                padding:15px;
                margin-top:10px;
            ">

                <h3>${group.group_name}</h3>
        `;

    group.teams.forEach((team) => {
      html += `
                <div>
                    ${team.team_name}
                </div>
            `;
    });

    html += `</div>`;
  });

  document.getElementById("groupsSection").innerHTML = html;
}

async function generateFixtures() {
  await fetch(`/api/fixtures/generate/${tournamentId}`, {
    method: "POST",
  });

  alert("Fixtures Generated");

  loadFixtures();
}

async function loadFixtures() {
  const response = await fetch(`/api/matches/${tournamentId}`);

  const matches = await response.json();

  let html = "<h2>Fixtures</h2>";

  matches.forEach((match) => {
    html += `
            <div style="
                border:1px solid #ddd;
                padding:10px;
                margin-top:10px;
            ">

                <h4>${match.group_name}</h4>

                <p>
                    ${match.team1}
                    VS
                    ${match.team2}
                </p>

                <p>
                    Status:
                    ${match.match_status}
                </p>

            </div>
        `;
  });

  document.getElementById("fixturesSection").innerHTML = html;
}

loadTournament();

loadTeams();

loadGroups();

loadFixtures();