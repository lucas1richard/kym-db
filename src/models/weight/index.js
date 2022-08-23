import getterMethods from './getterMethods';
import { config } from './config';

const makeWeight = ({ sequelize }) => {
  const Weight = sequelize.define('weight', config, {
    getterMethods,
  });

  return Weight;
};

export default makeWeight;
