import Sequelize from 'sequelize';

const config = {
  Seq: {
    type: Sequelize.INTEGER,
  },
  Amount: {
    type: Sequelize.DECIMAL,
  },
  Description: {
    type: Sequelize.STRING,
  },
  Gr_Wgt: {
    type: Sequelize.DECIMAL,
  },
};

export {

  config,
};
