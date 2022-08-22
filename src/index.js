import sequelize from './conn';

import Abbrev from './models/abbrev';
import AbbrevMicro from './models/abbrev-micro';
import Day from './models/day';
import FoodDesc from './models/food-des';
import Weight from './models/weight';
import FoodRecord from './models/food-record';
import User from './models/user';
import UserMeasurement from './models/user-measurements';
import MealGoals from './models/meal-goals';
import FoodGroup from './models/food-group';
import Meal from './models/meal';
import Program from './models/program';
import FoodPreferences from './models/food-preferences';
import Preferences from './models/preferences';
import UserRecordFavorites from './models/user-record-favorites';
import { ABBREV, USER, FOOD_GROUP } from './foreignKeys';

const abbrevId = { foreignKey: ABBREV };
const userId = { foreignKey: USER };
const FdGrpCd = { foreignKey: FOOD_GROUP };

const throughUserRecordFavorites = { through: UserRecordFavorites };

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

export {
  sequelize,
  Abbrev,
  AbbrevMicro,
  Day,
  FoodDesc,
  Weight,
  FoodPreferences,
  FoodRecord,
  Meal,
  User,
  UserMeasurement,
  UserRecordFavorites as UserFavorites,
  Preferences,
  Program,
  MealGoals,
  FoodGroup,
};
