import Sequelize from 'sequelize';

const makeRecordFavorite = ({ sequelize }) => sequelize.define('recordFavorite', {
  meal: {
    type: Sequelize.INTEGER,
  },
});

export default makeRecordFavorite;
