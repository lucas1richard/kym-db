import sequelize from '../../../conn';

const { Sequelize } = sequelize;

const config = {
  dayType: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
};

export {
  config,
};
