import sequelize from '../../conn';

import { config } from './config';
import { hooks } from './hooks';
import getterMethods from './getterMethods';

const {
  defaultScope,
  scopes,
} = require('./scopes');

const {
  addFavoriteFood,
  removeFavoriteFood,
  exRefreshToken,
  findByPassword,
  setupFitbit,
  requestCalories,
  requestFoodLog,
  sanitizeUser,
} = require('./classMethods');

const User = sequelize.define('user', config, {
  defaultScope,
  scopes,
  getterMethods,
  hooks,
});

User.addFavoriteFood = addFavoriteFood;
User.removeFavoriteFood = removeFavoriteFood;
User.exRefreshToken = exRefreshToken;
User.findByPassword = findByPassword;
User.setupFitbit = setupFitbit;
User.requestCalories = requestCalories;
User.requestFoodLog = requestFoodLog;
User.sanitizeUser = sanitizeUser;

export default User;
