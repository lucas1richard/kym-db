import Sequelize from 'sequelize';
import chalk from 'chalk';
import configurations from './config';

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';
const config = configurations[env];

// const dbName = process.env.NODE_ENV === 'test' ? 'kym-test' : 'kym';
// const logging = process.env.NODE_ENV !== 'test';

const { url, ...restConfig } = config;

// eslint-disable-next-line

// export default new Sequelize(
//   config.url,
//   config
// );

// const sequelize = new Sequelize(dbName, 'richard', 'Getitdone1', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: (msg) => {
//     if (msg.startsWith('Executing')) return;
//     console.log(msg);
//   },
// });

const connect = () => {
  console.log(chalk.magenta('connecting to db'), chalk.bold.magenta(url));
  return new Sequelize(url, restConfig);
};

export default connect;
