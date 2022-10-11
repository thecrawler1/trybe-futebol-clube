import { Model, DataTypes } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  home_team: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: { tableName: 'teams' },
      key: 'id',
    },
  },
  home_team_goals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  away_team: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: { tableName: 'teams' },
      key: 'id',
    },
  },
  away_team_goals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  in_progress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'homeTeam'});
Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'awayTeam'});

Match.hasMany(Team, { foreignKey: 'homeTeam', as: 'homeTeam'});
Match.hasMany(Team, { foreignKey: 'awayTeam', as: 'awayTeam'});

export default Match;
