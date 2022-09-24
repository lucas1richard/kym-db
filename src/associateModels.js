import {
  ABBREV, USER, FOOD_GROUP, MEAL,
} from './foreignKeys';

const abbrevId = { foreignKey: ABBREV };
const userId = { foreignKey: USER };
const FdGrpCd = { foreignKey: FOOD_GROUP };
const mealId = { foreignKey: MEAL };

/**
 * @param {object} param0 arguments
 * @param {Sequelize.Sequelize} param0.sequelize
 */
const associateModels = ({
  models: {
    UserRecordFavorites,
    Abbrev,
    AbbrevMicro,
    Day,
    FoodDesc,
    Weight,
    FoodRecord,
    User,
    UserMeasurement,
    MealGoals,
    FoodGroup,
    Meal,
    Program,
    FoodPreferences,
    Preferences,
  },
}) => {
  const throughUserRecordFavorites = {
    through: {
      model: UserRecordFavorites,
      uniqueKey: 'id',
    },
    constraints: false,
  };

  AbbrevMicro.belongsTo(Abbrev, abbrevId);
  Abbrev.hasOne(AbbrevMicro, abbrevId);

  FoodDesc.belongsTo(Abbrev, abbrevId);
  Abbrev.hasOne(FoodDesc, abbrevId);

  FoodDesc.belongsTo(FoodGroup, FdGrpCd);
  FoodGroup.hasMany(FoodDesc, FdGrpCd);

  FoodRecord.belongsTo(Meal, mealId);
  Meal.hasMany(FoodRecord, mealId);

  FoodRecord.belongsTo(Abbrev, abbrevId);
  Abbrev.hasMany(FoodRecord, abbrevId);

  FoodRecord.belongsTo(User, userId);
  User.hasMany(FoodRecord, userId);

  Meal.belongsTo(User, userId);
  User.hasMany(Meal, userId);

  MealGoals.belongsTo(User, userId);
  User.hasMany(MealGoals, userId);

  Day.belongsTo(User, userId);
  User.hasMany(Day, userId);

  Program.belongsTo(User, userId);
  User.hasMany(Program, userId);

  Preferences.belongsTo(User, userId);
  User.hasOne(Preferences, userId);

  User.belongsToMany(Abbrev, throughUserRecordFavorites);
  Abbrev.belongsToMany(User, throughUserRecordFavorites);

  UserMeasurement.belongsTo(User, userId);
  User.hasMany(UserMeasurement, userId);

  FoodPreferences.belongsTo(User, userId);
  User.hasMany(FoodPreferences, userId);

  FoodPreferences.belongsTo(Abbrev, abbrevId);
  Abbrev.hasMany(FoodPreferences, abbrevId);

  Weight.belongsTo(Abbrev, abbrevId);
  Abbrev.hasMany(Weight, abbrevId);

  return {
    UserRecordFavorites,
    Abbrev,
    AbbrevMicro,
    Day,
    FoodDesc,
    Weight,
    FoodRecord,
    User,
    UserMeasurement,
    MealGoals,
    FoodGroup,
    Meal,
    Program,
    FoodPreferences,
    Preferences,
  };
};

export default associateModels;
