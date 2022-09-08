// import sequelize from '../../../connect';
// import UserMeasurement from '../../user-measurements';
// import MealGoals from '../../meal-goals';
// import Meal from '../../meal';
// import Program from '../../program';
// import Abbrev from '../../abbrev';

const defaultScope = {
  // include: [
  //   {
  //     model: Program,
  //     order: [
  //       sequelize.fn('max', sequelize.col('id')),
  //     ],
  //   },
  // ],
};

const addUserScopes = ({ models }) => {
  const {
    Abbrev, UserMeasurement, FoodRecord, MealGoals, Program, Meal, User,
  } = models;

  const scopes = {
    withAbbrev: {
      include: [Abbrev],
    },
    withMeasurements: {
      include: [{
        model: UserMeasurement,
        order: [['id', 'desc']],
        limit: 1,
      }],
    },
    withMealGoals: {
      include: [{
        model: MealGoals,
        order: [['id', 'desc']],
        limit: 1,
      }],
    },
    withPrograms: {
      include: [{
        model: Program,
        order: [['id', 'desc']],
        limit: 1,
      }],
    },
    withMeals: {
      include: [{
        model: Meal,
        include: [FoodRecord],
      }],
    },
  };

  Object.entries(scopes).forEach(([scopeName, scopeVal]) => {
    User.addScope(scopeName, scopeVal);
  });
};

export {
  defaultScope,
  addUserScopes,
};
