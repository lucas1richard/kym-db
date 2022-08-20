import sequelize from '../../../conn';

const { Sequelize } = sequelize;

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
