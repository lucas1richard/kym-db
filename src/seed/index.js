// update abbrevs set "photo"='salami.png' where "Main"='Salami';
import path from 'path';

import chalk from 'chalk';
import dotEnv from 'dotenv';
import logger from '../utils/logger';
import {
  sequelize,
  Abbrev,
  AbbrevMicro,
  FoodDesc,
  FoodGroup,
  Weight,
} from '..';
import dataAbbrevs from './data/abbrev-sep.json';
import dataAbbrevsMicro from './data/abbrev-micro.json';
import dataFoodGroups from './data/fd-group.json';
import dataFoodDesc from './data/food-des.json';
import dataWeights from './data/weight.json';

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

/* istanbul ignore next */
sequelize.sync({ force: true })
  .then(() => {
    seeding('Abbrev');
    return Abbrev.bulkCreate(dataAbbrevs);
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
  // .then(() => {
  //   seedInfo('Weight', 'User');
  //   return db.User.bulkCreate(require('./data/contact'));
  // })
  // .then(() => {
  //   seedInfo('Weight', 'Meals');
  //   return db.Meal.bulkCreate(record.mealsArr);
  // })
  // .then(() => {
  //   seedInfo('Meals', 'UserMeasurement');
  //   return db.FoodRecord.bulkCreate(record.records);
  // })
  // .then(() => {
  //   seedInfo('UserMeasurement', 'FoodRecord');
  //   return db.UserMeasurement.bulkCreate(require('./data/contact-measurements'));
  // })
  // .then(() => {
  //   seedInfo('FoodRecord', 'MealGoals');
  //   return db.MealGoals.bulkCreate(require('./data/meal-goals'));
  // })
  // .then( () => {
  //   return db.Meal.update( { postWorkout: true }, { where: { meal: 4 } } );
  // } )
  .then(() => {
    seeded('Weight');
    logger.silly(chalk.green.inverse.bold(' Seeded OK '));
  })
  .then(() => sequelize.query('ALTER SEQUENCE abbrevs_id_seq RESTART WITH 8804'))
  .then(() => sequelize.query('ALTER SEQUENCE "abbrevMicros_id_seq" RESTART WITH 8463'))
  .then(() => sequelize.query('ALTER SEQUENCE "foodDes_id_seq" RESTART WITH 8650'))
  .then(() => sequelize.query('ALTER SEQUENCE "weights_id_seq" RESTART WITH 15242'))
  .then(() => process.exit())
  .catch((er) => logger.silly(er.stack));

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
