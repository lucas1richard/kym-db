import Sequelize from 'sequelize';
import chalk from 'chalk';

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';

import config from './config'[env];

// eslint-disable-next-line
console.log(chalk.magenta('connecting to db'), chalk.bold.magenta(config.url));

// export default new Sequelize(
//   config.url,
//   config
// );

export default new Sequelize('kym', 'richard', 'Getitdone1', {
  host: 'localhost',
  dialect: 'postgres',
});
