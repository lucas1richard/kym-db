import Sequelize from 'sequelize';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeRecordFavorite = ({ sequelize }) => sequelize.define('recordFavorite', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  meal: {
    type: Sequelize.INTEGER,
  },
}, {
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
});

export default makeRecordFavorite;
