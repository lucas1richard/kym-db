import logger from './logger';

export default {
  development: {
    url: process.env.DATABASE_URL,
    logging: logger,
    operatorsAliases: false,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    /* istanbul ignore next */
    logging: process.env.TEST_DATABASE_LOGGING
      ? /* istanbul ignore next */ logger
    /* istanbul ignore next */
      : false,
    operatorsAliases: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    logging: false,
    operatorsAliases: false,
  },
};
