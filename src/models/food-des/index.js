/**
 * @module models/food-des
 */

import getBestGroup from './classMethods/getBestGroup';
import { config } from './config';
import {
  scopes,
  defaultScope,
} from './scopes';

const makeFoodDesc = ({ sequelize }) => {
  const FoodDesc = sequelize.define('foodDesc', config, {
    defaultScope,
    scopes,
  });
  FoodDesc.getBestGroup = getBestGroup;

  return FoodDesc;
};

export default makeFoodDesc;
