import makeAbbrev from './models/abbrev';
import makeAbbrevMicro from './models/abbrev-micro';
import makeDay from './models/day';
import makeFoodDesc from './models/food-des';
import makeWeight from './models/weight';
import makeFoodRecord from './models/food-record';
import makeUser from './models/user';
import makeUserMeasurement from './models/user-measurements';
import makeMealGoals from './models/meal-goals';
import makeFoodGroup from './models/food-group';
import makeMeal from './models/meal';
import makeProgram from './models/program';
import makeFoodPreferences from './models/food-preferences';
import makePreferences from './models/preferences';
import makeUserRecordFavorites from './models/user-record-favorites';
import { ABBREV, USER, FOOD_GROUP } from './foreignKeys';

const abbrevId = { foreignKey: ABBREV };
const userId = { foreignKey: USER };
const FdGrpCd = { foreignKey: FOOD_GROUP };

/**
 * @param {object} param0 arguments
 * @param {Sequelize.Sequelize} param0.sequelize
 */
const associateModels = ({ sequelize }) => {
  const UserRecordFavorites = makeUserRecordFavorites({ sequelize });
  const throughUserRecordFavorites = { through: UserRecordFavorites };

  const Abbrev = makeAbbrev({ sequelize });
  const AbbrevMicro = makeAbbrevMicro({ sequelize });
  const Day = makeDay({ sequelize });
  const FoodDesc = makeFoodDesc({ sequelize });
  const Weight = makeWeight({ sequelize });
  const FoodRecord = makeFoodRecord({ sequelize });
  const User = makeUser({ sequelize });
  const UserMeasurement = makeUserMeasurement({ sequelize });
  const MealGoals = makeMealGoals({ sequelize });
  const FoodGroup = makeFoodGroup({ sequelize });
  const Meal = makeMeal({ sequelize });
  const Program = makeProgram({ sequelize });
  const FoodPreferences = makeFoodPreferences({ sequelize });
  const Preferences = makePreferences({ sequelize });

  AbbrevMicro.belongsTo(Abbrev, abbrevId);
  Abbrev.hasOne(AbbrevMicro, abbrevId);

  FoodDesc.belongsTo(Abbrev, abbrevId);
  Abbrev.hasOne(FoodDesc, abbrevId);

  FoodDesc.belongsTo(FoodGroup, FdGrpCd);
  FoodGroup.hasMany(FoodDesc, FdGrpCd);

  FoodRecord.belongsTo(Meal);
  Meal.hasMany(FoodRecord);

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
