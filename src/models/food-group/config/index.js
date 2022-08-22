import sequelize from '../../../conn';

const { Sequelize } = sequelize;

const config = {
  GroupID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  Description: {
    type: Sequelize.STRING,
  },
};

export {
  // eslint-disable-next-line import/prefer-default-export
  config,
};
