import sequelize from '../../../conn';

const { Sequelize } = sequelize;

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
