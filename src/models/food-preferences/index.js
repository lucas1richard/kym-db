import { config } from './config';
import { USER, ABBREV } from '../../foreignKeys';

/**
 * @param {{ sequelize: Sequelize.Sequelize }} param0
 * @returns {Sequelize.Model}
 */
const makeFoodPreferences = ({ sequelize }) => sequelize.define('foodPreference', config, {
  indexes: [
    {
      unique: true,
      fields: [USER, ABBREV],
    },
  ],
});

export default makeFoodPreferences;
