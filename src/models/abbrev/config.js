import Sequelize from 'sequelize';
import { USER } from '../../foreignKeys';

export const macroType = () => ({
  type: Sequelize.DECIMAL,
  allowNull: false,
  validate: {
    min: 0,
  },
});

export const titleType = () => ({
  type: Sequelize.TEXT,
  allowNull: false,
});

export const config = {
  main: titleType(),
  sub: titleType(),
  calories: macroType(),
  protein: macroType(),
  fat: macroType(),
  carbohydrates: macroType(),
  gmwt_1: {
    type: Sequelize.DECIMAL,
  },
  gmwt_desc1: {
    type: Sequelize.STRING,
  },
  gmwt_2: {
    type: Sequelize.DECIMAL,
  },
  gmwt_desc2: {
    type: Sequelize.STRING,
  },
  [USER]: {
    type: Sequelize.UUID,
  },
  photo: {
    type: Sequelize.STRING,
  },
};
