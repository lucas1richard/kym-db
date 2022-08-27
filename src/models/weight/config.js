import Sequelize from 'sequelize';

const config = {
  seq: {
    type: Sequelize.INTEGER,
  },
  amount: {
    type: Sequelize.DECIMAL,
  },
  description: {
    type: Sequelize.STRING,
  },
  gr_wgt: {
    type: Sequelize.DECIMAL,
  },
};

export {
  config,
};
