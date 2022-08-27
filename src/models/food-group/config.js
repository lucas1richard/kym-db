import Sequelize from 'sequelize';

const config = {
  groupid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
  },
};

export {
  // eslint-disable-next-line import/prefer-default-export
  config,
};
