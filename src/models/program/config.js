import Sequelize from 'sequelize';

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
  config,
};
