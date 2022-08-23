import Sequelize from 'sequelize';

const config = {
  preference: {
    type: Sequelize.ENUM,
    values: [
      'like',
      'dislike',
    ],
    allowNull: false,
  },
};

export {
  config,
};
