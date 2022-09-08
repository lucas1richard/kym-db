import { addUserScopes } from './models/user/addScopes';
import { addAbbrevScopes } from './models/abbrev/addScopes';
import { addFoodDescScopes } from './models/food-des/addScopes';
import { addMealScopes } from './models/meal/addScopes';
import { addFoodRecordScopes } from './models/food-record/addScopes';

const addScopes = ({ sequelize, models }) => {
  addAbbrevScopes({ models });
  addFoodDescScopes({ sequelize, models });
  addFoodRecordScopes({ models });
  addMealScopes({ sequelize, models });
  addUserScopes({ sequelize, models });

  return models;
};

export default addScopes;
