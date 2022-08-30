import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import { config } from './config';
import { defaultScope, scopes } from './scopes';
import { calMacros, updateQuantity } from './instanceMethods';
import {
  createWithMeal,
  findByDate,
  findMicroByDate,
} from './classMethods';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeFoodRecord = ({ sequelize }) => {
  const FoodRecord = sequelize.define('foodRecord', config, {
    defaultScope,
    scopes,
  });

  FoodRecord.createWithMeal = createWithMeal;
  FoodRecord.findByDate = findByDate;
  FoodRecord.findMicroByDate = findMicroByDate;

  FoodRecord.prototype.calMacros = calMacros;
  FoodRecord.prototype.updateQuantity = updateQuantity;

  return FoodRecord;
};

export default makeFoodRecord;
