import Sequelize from 'sequelize';
import beforeCreate from './hooks/beforeCreate';
import beforeUpdate from './hooks/beforeUpdate';
import sanitizeMealGoal from './classMethods/sanitizeMealGoal';
import sanitize from './instanceMethods/sanitizeMealGoal';

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

  MealGoals.prototype.sanitize = sanitize;

  MealGoals.sanitizeMealGoal = sanitizeMealGoal;

  return MealGoals;
};

export default makeMealGoals;
