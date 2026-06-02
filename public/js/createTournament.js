const form = document.getElementById("tournamentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    name: document.getElementById("name").value,

    total_teams: document.getElementById("teams").value,

    overs_per_match: document.getElementById("overs").value,

    group_count: document.getElementById("groups").value,

    qualification_type: document.getElementById("qualification").value,
  };

  const response = await fetch("/api/tournaments", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
  });

  const data = await response.json();

  localStorage.setItem("tournamentId", data.tournamentId);

 window.location.href = "/pages/dashboard.html";
});
