import Sequelize from 'sequelize';
import chalk from 'chalk';
import configurations from './config';

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';
const config = configurations[env];

const { url, ...restConfig } = config;

/**
 * Connect to the database
 * @returns {Sequelize.Sequelize}
 */
const connect = () => {
  console.log(chalk.magenta('connecting to database:'), chalk.bold.magenta(url));
  const sequelize = new Sequelize(url, {
    ...restConfig,
    define: {
      defaultScope: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  });
  return sequelize;
};

export default connect;
