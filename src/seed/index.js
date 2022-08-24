// update abbrevs set "photo"='salami.png' where "Main"='Salami';
import path from 'path';

import chalk from 'chalk';
import dotEnv from 'dotenv';
import logger from '../utils/logger';
import connectDatabase from '..';
import dataAbbrevs from '../../data/abbrev-sep.json';
import dataAbbrevsMicro from '../../data/abbrev-micro.json';
import dataFoodGroups from '../../data/fd-group.json';
import dataFoodDesc from '../../data/food-des.json';
import dataWeights from '../../data/weight.json';

const {
  sequelize,
  Abbrev,
  AbbrevMicro,
  FoodDesc,
  FoodGroup,
  Weight,
  User,
  Meal,
  FoodRecord,
  UserMeasurement,
  MealGoals,
  closeConnection,
} = connectDatabase();

dotEnv.config();

global.base_dir = path.resolve(__dirname, '..', '..');
global.abs_path = (pth) => global.base_dir + pth;

/* istanbul ignore next */
logger.silly(chalk.yellow.inverse.bold(' Begin Database seed '));
/* istanbul ignore next */
logger.silly('---------------------');
// logger.silly(chalk.magenta(' - Formatting records/meals'));
// const record = assignMeal(require('./data/food-record'));

// logger.silly(chalk.blue.bold(' -> Records/Meals formatted'));
// logger.silly('---------------------------');

/* istanbul ignore next */
function seeded(nexttoseed) {
  const msg = ` -> ${nexttoseed} seeded`;
  logger.silly(chalk.blue.bold(msg));
  logger.silly(msg.replace(/./g, '-'));
}
/* istanbul ignore next */
function seeding(seed) {
  logger.silly(chalk.magenta(` - Seeding ${seed}`));
}
/* istanbul ignore next */
function seedInfo(justseeded, nexttoseed) {
  seeded(justseeded);
  seeding(nexttoseed);
}

const abbrevs = dataAbbrevs.map((abbrev) => {
  const out = {};
  Object.keys(abbrev).forEach((key) => {
    out[key.toLowerCase()] = abbrev[key];
  });
  return out;
});

/* istanbul ignore next */
sequelize.sync({ force: true })
  .then(() => {
    seeding('Abbrev');
    return Abbrev.bulkCreate(abbrevs);
  })
  .then(() => {
    seedInfo('Abbrev', 'AbbrevMicro');
    return AbbrevMicro.bulkCreate(dataAbbrevsMicro);
  })
  .then(() => {
    seedInfo('AbbrevMicro', 'FoodGroup');
    return FoodGroup.bulkCreate(dataFoodGroups);
  })
  .then(() => {
    seedInfo('FoodGroup', 'FoodDesc');
    return FoodDesc.bulkCreate(dataFoodDesc);
  })
  .then(() => {
    seedInfo('FoodDesc', 'Weight');
    return Weight.bulkCreate(dataWeights);
  })
  .then(() => {
    seedInfo('Weight', 'User');
    return User.bulkCreate(require('../../data/contact.json'));
  })
  .then(() => {
    seedInfo('Weight', 'Meals');
    return Meal.bulkCreate(require('../../data/meals.json'));
  })
  .then(() => {
    seedInfo('Meals', 'FoodRecord');
    return FoodRecord.bulkCreate(require('../../data/food-record.json'));
  })
  .then(() => {
    seedInfo('FoodRecord', 'UserMeasurement');
    return UserMeasurement.bulkCreate(require('../../data/contact-measurements'));
  })
  .then(() => {
    seedInfo('FoodRecord', 'MealGoals');
    return MealGoals.bulkCreate(require('../../data/meal-goals'));
  })
  .then( () => {
    return Meal.update( { postWorkout: true }, { where: { meal: 4 } } );
  } )
  .then(() => {
    seeded('Weight');
    logger.silly(chalk.green.inverse.bold(' Seeded OK '));
  })
  .then(() => sequelize.query('ALTER SEQUENCE abbrevs_id_seq RESTART WITH 8804'))
  .then(() => sequelize.query('ALTER SEQUENCE "abbrevMicros_id_seq" RESTART WITH 8463'))
  .then(() => sequelize.query('ALTER SEQUENCE "foodDescs_id_seq" RESTART WITH 8650'))
  .then(() => sequelize.query('ALTER SEQUENCE "weights_id_seq" RESTART WITH 15242'))
  .then(() => closeConnection())
  .catch((er) => {
    logger.silly(er.stack);
    closeConnection();
  });

/* istanbul ignore next */
// function assignMeal(records) {
//   const mealsObj = records.reduce((memo, record) => {
//     if (!memo[record.Date]) {
//       memo[record.Date] = {};
//     }
//     if (!memo[record.Date][record.Meal]) {
//       memo[record.Date][record.Meal] = [];
//     }

//     memo[record.Date][record.Meal].push(record.ID);
//     return memo;
//   }, {});

//   const mealsArr = [];
//   Object.keys(mealsObj).forEach((date) => {
//     Object.keys(mealsObj[date]).forEach((mealIndex, ix) => {
//       mealsArr.push({
//         date: new Date(date).toDateString(),
//         meal: mealIndex,
//         user_uuid: 1,
//         public: mealsObj[date][mealIndex].length >= 3,
//         postWorkout: mealIndex === 4
//       });
//       // Turn mealsObj into a map
//       mealsObj[date][mealIndex] = mealsArr.length;
//     });
//   });

//   records = records.map((record) => {
//     record.mealId = mealsObj[record.Date][record.Meal];
//     return record;
//   });

//   return { records, mealsArr };
// }
