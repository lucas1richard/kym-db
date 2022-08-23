/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

import Sequelize from 'sequelize';

const makePreferences = ({ sequelize }) => sequelize.define('preferences', {
  preferences: Sequelize.JSON,
}, {
});

export default makePreferences;
