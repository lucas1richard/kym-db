import Sequelize from 'sequelize';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeRecordFavorite = ({ sequelize }) => sequelize.define('recordFavorite', {
  meal: {
    type: Sequelize.INTEGER,
  },
});

export default makeRecordFavorite;
