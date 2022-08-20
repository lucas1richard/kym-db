import sequelize from '../../conn';

const { Sequelize } = sequelize;

const RecordFavorite = sequelize.define('recordFavorite', {
  meal: {
    type: Sequelize.INTEGER,
  },
});

export default RecordFavorite;
