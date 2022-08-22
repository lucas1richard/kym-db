import logger from './logger';

export default {
  development: {
    url: process.env.DATABASE_URL,
    logging: logger,
    operatorsAliases: false,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    logging: false,
    operatorsAliases: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    logging: false,
    operatorsAliases: false,
  },
};
