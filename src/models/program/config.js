import Sequelize from 'sequelize';

const config = {
  startweight: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  endgoal: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  endweight: {
    type: Sequelize.DECIMAL,
  },
  startdate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  enddate: {
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
