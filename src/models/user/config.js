import Sequelize from 'sequelize';

const stringType = () => ({
  type: Sequelize.STRING,
});

/**
 * @typedef userConfig
 * @type {Object}
 * @property {integer} id
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {Date} birthdate
 * @property {string} googleId
 * @property {string} fitbitId
 * @property {string} fitbitToken
 * @property {string} fitbitRefreshToken
 */
const config = {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstname: stringType(),
  lastname: stringType(),
  preferredlocale: stringType(),
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.TEXT,
    validate: {
      isEmail: true,
    },
    unique: {
      args: true,
      msg: 'EMAIL_TAKEN',
    },
  },
  password: stringType(),
  salt: stringType(),
  birthdate: {
    type: Sequelize.DATEONLY,
  },
  googleId: stringType(),
  fitbitId: stringType(),
  fitbitToken: stringType(),
  fitbitRefreshToken: stringType(),
};

export {
  config,
  stringType,
};
