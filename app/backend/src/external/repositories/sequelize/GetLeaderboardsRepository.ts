import IGetLeaderboardsRepository from '../../../services/interfaces/IGetLeaderboardsRepository';
import HomeOrAwayTeam from '../../../entities/team/value-objects/HomeOrAwayTeam';
import TeamResultDTO from '../../../entities/team/dtos/TeamResultDTO';
import sequelize from '../../../database/models';

function makeField(field: string, homeOrAwayTeam: HomeOrAwayTeam): string {
  if (homeOrAwayTeam === HomeOrAwayTeam.home) return `home.home_${field} as ${field}`;
  if (homeOrAwayTeam === HomeOrAwayTeam.away) return `away.away_${field} as ${field}`;
  return `home.home_${field} + away.away_${field} as ${field}`;
}

export default class GetLeaderboardsRepository implements IGetLeaderboardsRepository {
  async perform(homeOrAwayTeam: HomeOrAwayTeam): Promise<TeamResultDTO[]> {
    const [results] = await sequelize.query(this.makeQuery(homeOrAwayTeam));

    return results as TeamResultDTO[];
  }

  makeQuery(homeOrAwayTeam: HomeOrAwayTeam): string {
    return `SELECT
      t.team_name as name,
      ${makeField('totalGames', homeOrAwayTeam)},
      ${makeField('totalVictories', homeOrAwayTeam)},
      ${makeField('totalLosses', homeOrAwayTeam)},
      ${makeField('totalDraws', homeOrAwayTeam)},
      ${makeField('goalsFavor', homeOrAwayTeam)},
      ${makeField('goalsOwn', homeOrAwayTeam)},
      (SELECT goalsFavor) - (SELECT goalsOwn) as goalsBalance,
      (SELECT totalVictories) * 3 + (SELECT totalDraws) as totalPoints,
      ROUND((SELECT totalPoints) / ((SELECT totalGames) * 3) * 100, 2) as efficiency
      ${this.subquery}
    `;
  }

  private readonly subquery = `
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON m.home_team = t.id
INNER JOIN
  (SELECT
    m.home_team as id,
    COUNT(*) as home_totalGames,
    CAST(SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) as SIGNED) as home_totalVictories,
    CAST(SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) as SIGNED) as home_totalLosses,
    CAST(SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) as SIGNED) as home_totalDraws,
    CAST(SUM(m.home_team_goals) as SIGNED) as home_goalsFavor,
    CAST(SUM(m.away_team_goals) as SIGNED) as home_goalsOwn
  FROM TRYBE_FUTEBOL_CLUBE.matches as m
  WHERE m.in_progress = false
  GROUP BY m.home_team) as home
ON home.id = t.id
INNER JOIN
  (SELECT
    m.away_team as id,
    COUNT(*) as away_totalGames,
    CAST(SUM(IF(m.away_team_goals > m.home_team_goals, 1, 0)) as SIGNED) as away_totalVictories,
    CAST(SUM(IF(m.away_team_goals < m.home_team_goals, 1, 0)) as SIGNED) as away_totalLosses,
    CAST(SUM(IF(m.away_team_goals = m.home_team_goals, 1, 0)) as SIGNED) as away_totalDraws,
    CAST(SUM(m.away_team_goals) as SIGNED) as away_goalsFavor,
    CAST(SUM(m.home_team_goals) as SIGNED) as away_goalsOwn
  FROM TRYBE_FUTEBOL_CLUBE.matches as m
  WHERE m.in_progress = false
  GROUP BY m.away_team) as away
ON away.id = t.id
WHERE m.in_progress = false
GROUP BY t.id
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC,
  goalsOwn ASC
  `;
}
