import getterMethods from './getterMethods';
import { config } from './config';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeWeight = ({ sequelize }) => {
  const Weight = sequelize.define('weight', config, {
    getterMethods,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  });

  return Weight;
};

export default makeWeight;
