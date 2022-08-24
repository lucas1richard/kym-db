/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

import Sequelize from 'sequelize';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makePreferences = ({ sequelize }) => sequelize.define('preferences', {
  preferences: Sequelize.JSON,
}, {
});

export default makePreferences;
