import findByDate from './classMethods/findByDate';
import { config } from './config';
import { scopes } from './scopes';

const makeMeal = ({ sequelize }) => {
  const Meal = sequelize.define('meal', config, {
    scopes,
  });

  Meal.findByDate = findByDate;

  return Meal;
};

export default makeMeal;
