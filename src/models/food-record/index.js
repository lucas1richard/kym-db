import { config } from './config';
import { defaultScope, scopes } from './scopes';
import { calMacros, updateQuantity } from './instanceMethods';
import {
  createWithMeal,
  findByDate,
  findMicroByDate,
  makeHistoricalArray,
} from './classMethods';

const makeFoodRecord = ({ sequelize }) => {
  const FoodRecord = sequelize.define('foodRecord', config, {
    defaultScope,
    scopes,
  });

  FoodRecord.createWithMeal = createWithMeal;
  FoodRecord.findByDate = findByDate;
  FoodRecord.findMicroByDate = findMicroByDate;
  FoodRecord.makeHistoricalArray = makeHistoricalArray;

  FoodRecord.prototype.calMacros = calMacros;
  FoodRecord.prototype.updateQuantity = updateQuantity;

  return FoodRecord;
};

export default makeFoodRecord;
