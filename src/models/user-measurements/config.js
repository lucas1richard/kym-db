import Sequelize from 'sequelize';

const config = {
  age: {
    type: Sequelize.DECIMAL,
  },
  gender: {
    type: Sequelize.ENUM,
    values: ['MALE', 'FEMALE'],
    allowNull: false,
  },
  height: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  units: {
    type: Sequelize.ENUM,
    values: ['IMPERIAL', 'METRIC'],
    allowNull: false,
  },
  weight: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  bodyfat: {
    type: Sequelize.DECIMAL,
    allowNull: true,
  },
  lifestyle: {
    type: Sequelize.ENUM,
    values: ['SEDENTARY', 'NORMAL', 'ACTIVE'],
    allowNull: false,
  },
  goal: {
    type: Sequelize.ENUM,
    values: ['LOSE_FAT', 'GAIN_MUSCLE', 'MAINTAIN'],
  },
  date: {
    type: Sequelize.DATE,
  },
  bmrTraditional: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  bmrBodyFat: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
};

export {
  config,
};
