/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

import sequelize from '../../conn';

const { Sequelize } = sequelize;

const Preferences = sequelize.define('preferences', {
  preferences: Sequelize.JSON,
}, {
});

export default Preferences;
