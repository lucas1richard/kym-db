import { config } from './config';
import { USER, ABBREV } from '../../foreignKeys';

const makeFoodPreferences = ({ sequelize }) => sequelize.define('foodPreference', config, {
  indexes: [
    {
      unique: true,
      fields: [USER, ABBREV],
    },
  ],
});

export default makeFoodPreferences;
