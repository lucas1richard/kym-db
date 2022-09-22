import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import { config } from './config';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeMeal = ({ sequelize }) => {
  const Meal = sequelize.define('Meal', config, {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  });

  return Meal;
};

export default makeMeal;
