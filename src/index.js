import Sequelize from 'sequelize'; // eslint-disable-line no-unused-vars
import buildModels from './buildModels';
import addScopes from './addScopes';
import associateModels from './associateModels';
import connect from './connect';
import * as foreignKeys from './foreignKeys';
import * as errorMessages from './errorMessages';

let sequelize;
let models = {};

const { Op } = Sequelize;

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
      const {
        User,
        UserMeasurement,
        Meal,
        Abbrev,
        AbbrevMicro,
        FoodRecord,
        FoodGroup,
        FoodDesc,
        Weight,
        Day,
        Program,
        MealGoals,
      } = models;
      await Promise.all([
        FoodRecord.destroy({ where: {}, force: true }),
        AbbrevMicro.destroy({ where: {}, force: true }),
        FoodDesc.destroy({ where: {}, force: true }),
        Weight.destroy({ where: {}, force: true }),
      ]);
      await Promise.all([
        Abbrev.destroy({ where: {}, force: true }),
        UserMeasurement.destroy({ where: {}, force: true }),
        Day.destroy({ where: {}, force: true }),
        Meal.destroy({ where: {}, force: true }),
        MealGoals.destroy({ where: {}, force: true }),
        Program.destroy({ where: {}, force: true }),
      ]);
      await Promise.all([
        User.destroy({ where: {}, force: true }),
        FoodGroup.destroy({ where: {}, force: true }),
      ]);
      await Promise.all([
        sequelize.query('ALTER SEQUENCE "abbrevs_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "users_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "userMeasurements_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "abbrevMicros_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "foodDescs_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "weights_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "foodRecords_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "meals_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "programs_id_seq" RESTART WITH 1'),
        sequelize.query('ALTER SEQUENCE "mealGoals_id_seq" RESTART WITH 1'),
      ]);
    },
    /**
     * close the database connection
     * @returns {Promise<any>}
     */
    closeConnection: async () => {
      await sequelize.close();
      sequelize = undefined;
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

    /** @type Sequelize.Model<{ meal: number }, { meal: number }> */
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
  Op,
  Sequelize,
};
