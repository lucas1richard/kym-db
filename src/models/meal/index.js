import sequelize from '../../conn';

import findByDate from './classMethods/findByDate';
import { config } from './config';
import { scopes } from './scopes';

const Meal = sequelize.define('meal', config, {
  scopes,
});

Meal.findByDate = findByDate;

export default Meal;
