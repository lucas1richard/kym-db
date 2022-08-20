import sequelize from '../../conn';
import getterMethods from './getterMethods';
import { config } from './config';

const Weight = sequelize.define('weight', config, {
  getterMethods,
});

export default Weight;
