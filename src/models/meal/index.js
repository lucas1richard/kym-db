import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import findByDate from './classMethods/findByDate';
import { config } from './config';
import { scopes } from './scopes';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeMeal = ({ sequelize }) => {
  const Meal = sequelize.define('Meal', config, {
    scopes,
  });

  Meal.findByDate = findByDate;

  return Meal;
};

export default makeMeal;
