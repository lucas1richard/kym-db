import sequelize from '../../conn';
import beforeCreate from './hooks/beforeCreate';
import beforeUpdate from './hooks/beforeUpdate';
import sanitizeMealGoal from './classMethods/sanitizeMealGoal';
import sanitize from './instanceMethods/sanitizeMealGoal';

const { Sequelize } = sequelize;

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

export default MealGoals;
