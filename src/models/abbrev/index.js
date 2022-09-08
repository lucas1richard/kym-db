/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import calculateMacros from './classMethods/calculateMacros';
import fpCalculateMacros from './classMethods/fpCalculateMacros';
import dayCalculation from './classMethods/dayCalculation';
import getterMethods from './getterMethods';
import hooks from './hooks';
import { config } from './config';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeAbbrev = ({ sequelize }) => {
  const Abbrev = sequelize.define('abbrev', config, {
    /** Include Weight and FoodDesc */
    getterMethods,
    hooks,
  });

  Abbrev.calculateMacros = calculateMacros;
  Abbrev.fpCalculateMacros = fpCalculateMacros;
  Abbrev.dayCalculation = dayCalculation;

  return Abbrev;
};

export default makeAbbrev;
