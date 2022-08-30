import Sequelize from 'sequelize';
import beforeCreate from './hooks/beforeCreate';
import beforeUpdate from './hooks/beforeUpdate';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeMealGoals = ({ sequelize }) => {
  const MealGoals = sequelize.define('mealGoals', {
    goals: {
      type: Sequelize.JSON,
    },
  }, {
    hooks: {
      beforeCreate,
      beforeUpdate,
    },
  });

  return MealGoals;
};

export default makeMealGoals;
