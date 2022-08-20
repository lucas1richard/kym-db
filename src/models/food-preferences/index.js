import sequelize from '../../conn';
import { config } from './config';
import { USER, ABBREV } from '../../foreignKeys';

const FoodPreferences = sequelize.define('foodPreference', config, {
  indexes: [
    {
      unique: true,
      fields: [USER, ABBREV],
    },
  ],
});

export default FoodPreferences;
