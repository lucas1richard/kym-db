/**
 * @module models/food-des
 */

 import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import getBestGroup from './classMethods/getBestGroup';
import { config } from './config';
import {
  scopes,
  defaultScope,
} from './scopes';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeFoodDesc = ({ sequelize }) => {
  const FoodDesc = sequelize.define('foodDesc', config, {
    defaultScope,
    scopes,
  });
  FoodDesc.getBestGroup = getBestGroup;

  return FoodDesc;
};

export default makeFoodDesc;
