require("dotenv").config();

const express = require("express");
const cors = require("cors");

const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));


const tournamentRoutes = require("./routes/tourRoutes");
const teamRoutes = require("./routes/teamRoutes");
const groupRoutes = require("./routes/groupRoutes");
const fixtureRoutes = require("./routes/fixtureRoutes");
const matchRoutes = require("./routes/matchRoutes");



app.use("/api/tournaments", tournamentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/fixtures", fixtureRoutes);
app.use("/api/matches", matchRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
