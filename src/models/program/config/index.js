import sequelize from '../../../conn';

const { Sequelize } = sequelize;

const config = {
  startWeight: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  endGoal: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  endWeight: {
    type: Sequelize.DECIMAL,
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['IN_PROGRESS', 'COMPLETE'],
    allowNull: false,
    defaultValue: 'IN_PROGRESS',
  },
  result: {
    type: Sequelize.ENUM,
    values: ['TBD', 'SUCCESS', 'FAILURE'],
    allowNull: false,
  },

};

export {
  // eslint-disable-next-line import/prefer-default-export
  config,
};
