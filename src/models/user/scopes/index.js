// import sequelize from '../../../conn';
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

const scopes = {
  // abbrev: {
  //   include: [Abbrev],
  // },
  // measurements: {
  //   include: [{
  //     model: UserMeasurement,
  //     order: [
  //       ['id', 'desc'],
  //     ],
  //   }],
  // },
  // 'meal-goals': {
  //   include: [{
  //     model: MealGoals,
  //     order: [
  //       sequelize.fn('max', sequelize.col('id')),
  //     ],
  //   }],
  // },
  // programs: {
  //   include: [{
  //     model: Program,
  //     order: [
  //       sequelize.fn('max', sequelize.col('id')),
  //     ],
  //   }],
  // },
  // meals: {
  //   include: [
  //     Meal.scope('records'),
  //   ],
  // },
};

export {
  defaultScope,
  scopes,
};
