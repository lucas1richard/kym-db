import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import buildModels from './buildModels';
import addScopes from './addScopes';
import associateModels from './associateModels';
import connect from './connect';
import * as foreignKeys from './foreignKeys';
import * as errorMessages from './errorMessages';

let sequelize;
let models = {};

/**
 * @module connectDatabase
 */
const connectDatabase = () => {
  if (!sequelize) {
    sequelize = connect();
    models = buildModels({ sequelize });
    associateModels({ models });
    addScopes({ sequelize, models });
  }

  return {
    /**
     * sync the database by dropping and recreating tables
     * @returns {Promise<any>}
     */
    forceSync: async () => sequelize.sync({ force: true }),
    /**
     * sync the database without dropping and recreating tables
     * @returns {Promise<any>}
     */
    sync: async () => sequelize.sync(),
    /**
     * drop all values from all models
     * @returns {Promise<any>}
     */
    destroyAll: async () => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Restricted in prod');
      }
      await Promise.all(
        Object.values(models).map((model) => model.destroy({ where: {} })),
      );
    },
    /**
     * close the database connection
     * @returns {Promise<any>}
     */
    closeConnection: async () => {
      await sequelize.close();
    },

    /** @type Sequelize.Sequelize */
    sequelize,

    /** @type Sequelize.Model */
    UserRecordFavorites: models.UserRecordFavorites,

    /** @type Sequelize.Model */
    Abbrev: models.Abbrev,

    /** @type Sequelize.Model */
    AbbrevMicro: models.AbbrevMicro,

    /** @type Sequelize.Model */
    Day: models.Day,

    /** @type Sequelize.Model */
    FoodDesc: models.FoodDesc,

    /** @type Sequelize.Model */
    Weight: models.Weight,

    /** @type Sequelize.Model */
    FoodRecord: models.FoodRecord,

    /** @type Sequelize.Model */
    User: models.User,

    /** @type Sequelize.Model */
    UserMeasurement: models.UserMeasurement,

    /** @type Sequelize.Model */
    MealGoals: models.MealGoals,

    /** @type Sequelize.Model */
    FoodGroup: models.FoodGroup,

    /** @type Sequelize.Model */
    Meal: models.Meal,

    /** @type Sequelize.Model */
    Program: models.Program,

    /** @type Sequelize.Model */
    FoodPreferences: models.FoodPreferences,

    /** @type Sequelize.Model */
    Preferences: models.Preferences,
  };
};

export {
  foreignKeys,
  errorMessages,
  connectDatabase,
};
