// update abbrevs set "photo"='salami.png' where "Main"='Salami';
import path from 'path';
import chalk from 'chalk';
import logger from '../utils/logger';
import {
  sequelize,
  Abbrev,
  FoodDesc,
  FoodGroup,
  Weight,
} from '..';
import dataAbbrevsPartial from './data/partial/abbrevsPartial.json';
import dataFoodGroups from './data/fd-group.json';
import dataFoodDescPartial from './data/partial/foodDescPartial.json';
import dataWeightsPartial from './data/partial/weightsPartial.json';

global.base_dir = path.resolve(__dirname, '..', '..');
global.abs_path = (pth) => global.base_dir + pth;

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
// import filteredMeals from '../data/filteredmeals';

// const allFoodsArray = filteredMeals.reduce((accum, meal) => {
//   return accum.concat(meal);
// }, []);

// let maxFoodId = 0;
// let maxWeightId = 0;
// const allFoodsHash = {};
// const allWeightsHash = {};

// allFoodsArray.forEach((food) => {
//   food.forEach((item) => {
//     if (allFoodsHash[item.id]) {
//       return;
//     }
//     allFoodsHash[item.id] = item;
//     if (item.id > maxFoodId) {
//       maxFoodId = item.id;
//     }
//     item.weights.forEach((weight) => {
//       if (allWeightsHash[weight.id]) {
//         return;
//       }
//       if (weight.id > maxWeightId) {
//         maxWeightId = weight.id;
//       }
//       allWeightsHash[weight.id] = weight;
//     });
//   });
// });

// async function seedFilteredMeals() {
//   await db.sequelize.sync();
//   // logger.silly(chalk.yellow('All Weights Length'));
//   // logger.silly(Object.values(allWeightsHash).length);
//   // logger.silly(chalk.yellow('Max Weight Id'));
//   // logger.silly(maxWeightId);
//   // logger.silly(chalk.yellow('All Foods Length'));
//   // logger.silly(Object.values(allFoodsHash).length);
//   // logger.silly(chalk.yellow('Max Food Id'));
//   // logger.silly(maxFoodId);
//   // logger.silly(chalk.yellow('A Sample Food'));
//   // logger.silly(Object.values(allFoodsHash)[0]);
//   const getAbbrevs = Promise.all(
//     Object.keys(allFoodsHash).map((id) => {
//       return db.Abbrev.findById(id);
//     })
//   );
//   const abbrevs = await getAbbrevs;
//   logger.silly(abbrevs);
//   const foodDescs = abbrevs.reduce((accum, abbrev) => {
//     accum.push(abbrev.foodDesc);
//     return accum;
//   }, []);
//   const weights = abbrevs.reduce((accum, abbrev) => {
//     return accum.concat(abbrev.weights);
//   }, []);
//   fs.writeFile('server/db/seed/data/partial/foodDescPartial.json', JSON.stringify(foodDescs), (err) => {
//     if (err) {
//       throw err;
//     }
//     logger.silly(chalk.inverse.magenta('foodDesc.json written'));
//   });
//   fs.writeFile('server/db/seed/data/partial/weightsPartial.json', JSON.stringify(weights), (err) => {
//     if (err) {
//       throw err;
//     }
//     logger.silly(chalk.inverse.magenta('weights.json written'));
//   });
//   fs.writeFile('server/db/seed/data/partial/abbrevsPartial.json', JSON.stringify(abbrevs), (err) => {
//     if (err) {
//       throw err;
//     }
//     logger.silly(chalk.inverse.magenta('abbrevs.json written'));
//   });
// }

// seedFilteredMeals();

/* istanbul ignore next */
sequelize.sync({ force: true })
  .then(() => {
    seeding('Abbrev');
    return Abbrev.bulkCreate(dataAbbrevsPartial);
  })
  // .then(() => {
  //   seedInfo('Abbrev', 'AbbrevMicro');
  //   return AbbrevMicro.bulkCreate(require('./data/abbrev-micro'));
  // })
  .then(() => {
    seedInfo('Abbrev', 'FoodGroup');
    return FoodGroup.bulkCreate(dataFoodGroups);
  })
  .then(() => {
    seedInfo('FoodGroup', 'FoodDesc');
    return FoodDesc.bulkCreate(dataFoodDescPartial);
  })
  .then(() => {
    seedInfo('FoodDesc', 'Weight');
    return Weight.bulkCreate(dataWeightsPartial);
  })
  .then(() => {
    seeded('Weight');
    logger.silly(chalk.green.inverse.bold(' Seeded OK '));
  })
  .then(() => sequelize.query('ALTER SEQUENCE abbrevs_id_seq RESTART WITH 8804'))
  .then(() => sequelize.query('ALTER SEQUENCE "abbrevMicros_id_seq" RESTART WITH 8463'))
  .then(() => sequelize.query('ALTER SEQUENCE "foodDescs_id_seq" RESTART WITH 8650'))
  .then(() => sequelize.query('ALTER SEQUENCE "weights_id_seq" RESTART WITH 15242'))
  .then(() => process.exit())
  .catch((er) => logger.silly(er.stack));
