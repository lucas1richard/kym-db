import Sequelize from 'sequelize';

const config = {
  preference: {
    type: Sequelize.ENUM,
    values: ['LIKE', 'DISLIKE'],
    allowNull: false,
  },
};

export {
  config,
};
