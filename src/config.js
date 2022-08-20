import logger from './logger';

export
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
