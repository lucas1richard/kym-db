import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
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

  return Meal;
};

export default makeMeal;
