/**
 * @module models/food-des
 */

import sequelize from '../../conn';
import getBestGroup from './classMethods/getBestGroup';
import { config } from './config';
import {
  scopes,
  defaultScope,
} from './scopes';

const FoodDesc = sequelize.define('foodDesc', config, {
  defaultScope,
  scopes,
});

FoodDesc.getBestGroup = getBestGroup;

export default FoodDesc;
