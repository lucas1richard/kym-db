/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

import calculateMacros from './classMethods/calculateMacros';
import fpCalculateMacros from './classMethods/fpCalculateMacros';
import dayCalculation from './classMethods/dayCalculation';
import getterMethods from './getterMethods';
import hooks from './hooks';
import { scopes, defaultScope } from './scopes';
import { config } from './config';

const makeAbbrev = ({ sequelize }) => {
  /**
   * define the database model, abbrev
   */
  const Abbrev = sequelize.define('abbrev', config, {

    /** Include Weight and FoodDesc */
    defaultScope,

    getterMethods,

    scopes,

    hooks,
  });

  Abbrev.calculateMacros = calculateMacros;
  Abbrev.fpCalculateMacros = fpCalculateMacros;
  Abbrev.dayCalculation = dayCalculation;

  return Abbrev;
};

export default makeAbbrev;
