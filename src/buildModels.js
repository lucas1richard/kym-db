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

const buildModels = ({ sequelize }) => {
  const UserRecordFavorites = makeUserRecordFavorites({ sequelize });
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

export default buildModels;
