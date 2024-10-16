const Axios = require("axios");
const Match = require("../models").match;
const {
  apiUrlDemo,
  apiUrlResource,
  apiKey,
  apiUrl,
} = require("../config/constants");

const league_id = 566;

const getMatches = async () => {
  const response = await Axios.get(
    `${apiUrl}/fixtures/league/${league_id}`,

    {
      headers: {
        "X-RapidAPI-Key": apiKey,
      },
    }
  );

  const allFixtures = response.data.api;
  //   console.log("What is all fixture data?", allFixtures);

  const fixtures = allFixtures.fixtures.map((fixture) => {
    return {
      id: fixture.fixture_id,
      homeTeamId: fixture.homeTeam.team_id,
      homeTeamName: fixture.homeTeam.team_name,
      homeTeamLogo: fixture.homeTeam.logo,
      goalsHomeTeam: fixture.goalsHomeTeam,
      awayTeamId: fixture.awayTeam.team_id,
      awayTeamName: fixture.awayTeam.team_name,
      awayTeamLogo: fixture.awayTeam.logo,
      goalsAwayTeam: fixture.goalsAwayTeam,
      eventTimeStamp: fixture.event_timestamp,
      round: fixture.round,
      status: fixture.statusShort,
    };
  });
  console.log(fixtures);

  const savedFixtures = Match.bulkCreate(fixtures, {
    updateOnDuplicate: ["id"],
  });
};

// getMatches();
exports.getMatches = getMatches;
// exports = { getMatches, checkMatches };
