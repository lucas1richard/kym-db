import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import { config } from './config';
import { hooks } from './hooks';
import getterMethods from './getterMethods';
import {
  addFavoriteFood,
  removeFavoriteFood,
  exRefreshToken,
  findByPassword,
  setupFitbit,
  requestCalories,
  requestFoodLog,
  sanitize,
} from './classMethods';
import findFavoriteFoods from './classMethods/findFavoriteFoods';

/**
 * @param {object} param0
 * @param {Sequelize.Sequelize} param0.sequelize sequelize instance
 * @returns {Sequelize.Model}
 */
const makeUser = ({ sequelize }) => {
  const User = sequelize.define('user', config, {
    getterMethods,
    hooks,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  });

  User.addFavoriteFood = addFavoriteFood;
  User.removeFavoriteFood = removeFavoriteFood;
  User.findFavoriteFoods = findFavoriteFoods;
  User.exRefreshToken = exRefreshToken;
  User.findByPassword = findByPassword;
  User.setupFitbit = setupFitbit;
  User.requestCalories = requestCalories;
  User.requestFoodLog = requestFoodLog;
  User.sanitize = sanitize;

  return User;
};

export default makeUser;
